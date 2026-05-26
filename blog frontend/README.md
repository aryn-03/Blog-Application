### Using Toast in React app

    - npm install react-hot-toast
    - Add Toaser component at Root
        <Toaster position="top-center" reverseOrder={false} /> in App.jsx

    - Use toast with custom messages
        Eg:
            import toast from "react-hot-toast";

            if (resObj.status === 201) {
                toast.success("Account created successfully");
                navigate("/login");
            }

### From UserProfile component,

    - Read articles of all AUthors
    - Display them in the form of Grid of cards
                1 card for extra  small
                2 cards for small
                3 cards for medium
                4 cards from large screen onwards

### From AuthorProfile component,

    - Read articles of his own
    - Display them in the form of Grid of cards
                1 card for extra  small
                2 cards for small
                3 cards for medium
                4 cards from large screen onwards

### When User /Author click on specific article from Articles list

    - Navigate to "ArticleByID" component along with selected article
    - Display the  article title, category, content along with author title & time stamps in IST format
