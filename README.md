# ScribbleNest Frontend

## Project Description

**ScribbleNest** is a blogging platform designed for writers and readers. The frontend of ScribbleNest provides an intuitive and engaging user interface where users can read, write, and manage blog posts. It features a responsive design that works across various devices and browsers.

## File Structure

The project is organized as follows:

```
src/
│
├── common/
│ ├── aws.jsx
│ ├── date.jsx
│ ├── filter-pagination-data.jsx
│ ├── firebase.jsx
│ ├── page-animation.jsx
│ └── session.jsx
│
src/
│
├── components/
│   ├── About.component.jsx
│   ├── BlogContent.component.jsx
│   ├── BlogEditor.jsx
│   ├── BlogInteraction.jsx
│   ├── BlogPost.jsx
│   ├── CommentCard.jsx
│   ├── CommentField.jsx
│   ├── Comments.jsx
│   ├── InpageNavigation.jsx
│   ├── Input.component.jsx
│   ├── LoadMore.jsx
│   ├── Loader.jsx
│   ├── ManageBlogCard.jsx
│   ├── Navbar.jsx
│   ├── NoBanner.jsx
│   ├── NoData.jsx
│   ├── NotificationCard.jsx
│   ├── PublishForm.jsx
│   ├── SideNavBar.jsx
│   ├── Tags.jsx
│   ├── Tools.jsx
│   ├── UserNavigation.jsx
│   └── UserCard.jsx
│
├── imgs/
│   └── [Images related to the project]
│
├── pages/
│ ├── 404.pages.jsx
│ ├── Blog.pages.jsx
│ ├── ChangePassword.pages.jsx
│ ├── EditProfile.pages.jsx
│ ├── Editor.pages.jsx
│ ├── Home.pages.jsx
│ ├── ManageBlogs.pages.jsx
│ ├── Notifications.pages.jsx
│ ├── Profile.pages.jsx
│ ├── Search.pages.jsx
│ └── UserAuthForm.pages.jsx
│
├── editor-theme.css
├── index.html
├── app.jsx
├── index.css
└── main.jsx
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For routing and navigation.
- **Axios**: For making HTTP requests.
- **Firebase**: For authentication with Google.
- **Editor.js**: For rich text editing.
- **Framer Motion**: For animations.
- **Cloudinary**: For image uploads (through the `uploadImage` function).

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Mukulraj109/frontend.git
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm start
   ```

   This will start the development server and open the application in your default web browser.

## Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
VITE_SERVER_DOMAIN=<Your backend server domain>
```

Replace `<Your backend server domain>` with the URL of your backend server.

## Usage

- **Authentication**: Sign in using Google through Firebase authentication.
- **Writing Blogs**: Use the editor to write and format your blog posts.
- **Managing Blogs**: View and manage your published and draft blogs.
- **Notifications**: Receive notifications for new comments and updates.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Editor.js](https://editorjs.io/)
- [Framer Motion](https://www.framer.com/api/motion/)
- [Cloudinary](https://cloudinary.com/)
```
