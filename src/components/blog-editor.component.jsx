import {Link, useNavigate, useParams} from "react-router-dom"
import lightlogo from "../imgs/logo-light.png"
import darklogo from "../imgs/logo-dark.png"
import AnimationWrapper from "../common/page-animation";
import { useContext, useEffect, useRef } from "react";
import {Toaster ,toast} from "react-hot-toast"
import { uploadImage } from '../common/aws'; // Adjust the path if necessary
import lightBanner from "../imgs/blog banner light.png"
import darkBanner from "../imgs/blog banner dark.png"
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs"
import { tools } from "./tools.component";
import axios from "axios";
import { ThemeContext, UserContext } from "../App";

const BlogEditor = () =>{

    let { blog , blog : { title , banner , content,tags, des}, setBlog,textEditor,setTextEditor,setEditorState} = useContext(EditorContext);
    let {userAuth : {access_token}} = useContext(UserContext)
    let {blog_id} = useParams();
    let{theme} = useContext(ThemeContext);
    let navigate = useNavigate();

    useEffect(()=>{
    setTextEditor(new EditorJS({
        holderId :"textEiditor",
        data : Array.isArray(content) ? content[0]: content,
        tools: tools,
        placeholder : " Let's write awesome stroy "
    }))
        }
    ,[])

const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Exit if no file is selected

    // Show loading toast
    const loadingToast = toast.loading("Uploading...");

    try {
        // Perform the image upload
        const imageUrl = await uploadImage(file); // Await the promise returned by uploadImage

        // Dismiss the loading toast and show success message
        toast.dismiss(loadingToast);
        toast.success("Image uploaded successfully!");

        // Set the image URL to the image element
        
        setBlog({...blog, banner:imageUrl});
    } catch (error) {
        // Dismiss the loading toast and show error message
        toast.dismiss(loadingToast);
        toast.error(`Failed to upload image: ${error.message}`);
    }
};

const handelTitleKeyDown = (e) =>{
    if(e.keyCode == 13){
        e.preventDefault();
    }
}
const handelTitleChange = (e) =>{
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    
    setBlog({...blog, title : input.value});
}

const handelError = (e) =>{
    let img = e.target;
    img.src = theme=="light" ? lightBanner : darkBanner;
}

const handelPublishEvent = (e) =>{
    if(!banner.length){
        return toast.error("Upload a blog banner to publish it");
    }
    if(!title.length){
        return toast.error("Enter a title for your blog");
    }
    if(textEditor.isReady){
        textEditor.save().then(data=>{
            if(data.blocks.length){
                setBlog({...blog, content : data})
                setEditorState("publish");
            }else{
                return toast.error("Write some content for your blog");
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    }
}
const handelSaveDraft = (e)=>{

        if(e.target.className.includes("disable")){
            return;
        }
        if(!title.length){
            return toast.error("Write blog title before saving it as a draft");
        }
    
        let loadingToast = toast.loading("Saving draft...");
    
        e.target.classList.add('disable');
        
        if(textEditor.isReady){

            textEditor.save().then(content=>{
                let blogObj = {
                    title,
                    des,
                    content,
                    banner,
                    tags,
                    draft: true
                }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",
                    {...blogObj,id: blog_id},{
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        }
                    })
                .then(()=>{
                    e.target.classList.remove('disable');
        
                    toast.dismiss(loadingToast);
                    toast.success("saved successfully");
                    
                    setTimeout(()=>{
                    navigate("/dashboard/blogs?tab=draft");
                    },500)
                })
                .catch(({ response })=>{
        
                    e.target.classList.remove("disable");
        
                    toast.dismiss(loadingToast);
                    
                    return  toast.error(response.data.error);
                })
            })
        }
        
    }


    return(
        <>
        <nav className="navbar">
            <Link to="/">
            <img src = {theme=="light"?darklogo:lightlogo} className="flex-none w-10 " />
            </Link>
            <p className="max-md:hidden tect-black line-clamp-1 w-full">
                {title.length ? title : "New Blog"}
                
            </p>
            <div className="flex gap-4 ml-auto">
                <button className="btn-dark py-2"
                    onClick={handelPublishEvent}
                >
                    Publish
                </button>
                <button className="btn-light py-2"
                onClick={handelSaveDraft}
                >
                    Save Draft
                </button>
            </div>
        </nav>
        <Toaster />
        <AnimationWrapper>
            <section>
                <div className="mx-auto max-w-[900px] w-full">
                    

                <div className ="relative aspect-video hover:opacity-80 bg-wite border-4 border-grey">
                        <label htmlFor="uploadBanner" >
                            <img
                            src={banner}
                            className="z-20"
                            onError={handelError}
                            />
                            <input 
                            id="uploadBanner" 
                            type = "file"
                            accept=".png, .jpg, .jpeg"
                            hidden
                            onChange={handleBannerUpload}
                            />

                        </label>
                </div>
                <textarea
                defaultValue={title}
                placeholder="Blog Tile"
                className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 bg-white"
                onKeyDown={handelTitleKeyDown}
                onChange={handelTitleChange}
                >
                
                </textarea>
                <hr className="w-full opacity-10 my-5"/>

                <div id="textEiditor" className="font-gelasio">

                </div>


                </div>
            </section>
        </AnimationWrapper>
        </>
    )
}

export default BlogEditor;