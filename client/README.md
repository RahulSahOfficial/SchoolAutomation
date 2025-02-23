save this in your browser
```

const user = {
  userId:1234,
  role: "student",
  name: "John Doe",
  email: "john.doe@example.com",
  profilePic: "/images/profile.png"
};
localStorage.setItem("user", JSON.stringify(user));
```