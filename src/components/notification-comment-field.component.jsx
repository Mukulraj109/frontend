import { useContext, useState } from "react";
import toast ,{ Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";




const NotificationCommentField = ({_id,blog_author,index = undefined,replyingTo = undefined,setReplying, notification_id, notificationData}) =>{

    let [comment,setcomment] = useState('');

    let {_id:user_id} = blog_author;
    let {userAuth: {access_token}} =useContext(UserContext);;
    let {notifications,notifications:{results},setnotifications} = notificationData;
    
    const handelComment = ()=>{

            if(!comment.length){
                return toast.error("comment can't be empty")
            }
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/add-comment",{
                _id,blog_author: user_id,comment,replying_to: replyingTo,notification_id
            },{
                headers:{
                    "Authorization": `Bearer ${access_token}`
                }
            })
            .then(({data})=>{
                setReplying(false);
                results[index].reply = {comment, _id: data._id}
                setnotifications({...notifications,results});
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return (
        <>
        <Toaster/>
        <textarea value = {comment}
        onChange = {(e)=> setcomment(e.target.value)}
        placeholder="Leave a reply..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
        ></textarea>
        <button 
        onClick={handelComment}
        className="btn-dark mt-5 px-10">Reply</button>
        </>
    )
}

export default NotificationCommentField;