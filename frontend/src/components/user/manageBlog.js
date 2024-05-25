import { Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageBlog = () => {
  const timeAgo = new TimeAgo("en-US");
  const url = app_config.backend_url;
  const [selFile, setSelFile] = useState("");

  const [blogArray, setBlogArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const navigate = useNavigate();

  const fetchVideos = () => {
    fetch(url + "/blog/getall/").then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setLoading(false);
          setBlogArray(data);
        });
      }
    });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const deleteData = (id) => {
    fetch(url + "/blog/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchVideos();
        toast.success("Blog Successfully Deleted!!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        Swal.fire({
          icon: "success",
          title: "Success!!",
          text: "Deleted",
        });
      });
  };

  const displayBlogs = () => {
    if (loading) return;
    return (
      <div className="row mt-2">
        {blogArray.map(
          ({ _id, title, description, thumbnail, author, createdAt }) => (
            <div class="col-sm col-md-3">
              <Card sx={{ maxWidth: 345 }} className="rounded">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={url + "/uploads/" + thumbnail}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    { description}  
                  </Typography>
                </CardContent>
                <CardActions>
                  <button
                    className="btn btn-dark mt-4 "
                    onClick={(e) => deleteData(_id)}
                  >
                    Delete
                  </button>
                </CardActions>
              </Card>
            </div>
          )
        )}
      </div>
    );
  };

  return <div>
    <section class="section home-5-bg" id="home">
        <div
          id="particles-js"
          style={{
            backgroundImage: `url("https://www.teahub.io/photos/full/177-1777757_wallpaper-nature-blur-background-hd.jpg")`,
          }}
        ></div>
        <div class="bg-overlay"></div>
        <div class="home-center">
          <div class="home-desc-center">
            <div class="container">
              <div class="justify-content-center row">
                <div class="col-lg-7">
                  <div class="mt-40 text-center home-5-content">
                    <div class="home-icon mb-4">
                      <i class="mdi mdi-pinwheel mdi-spin text-white h1"></i>
                    </div>
                    <h1 class="text-white font-weight-normal home-5-title mb-0" style={{ fontFamily: "Courgette" }}>
                      Auto Blogger
                    </h1>
                    <p class="text-white-70 mt-4 f-15 mb-0">
                  
                    “Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.”
                    </p>
                    <div class="mt-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-4">
      {displayBlogs()}
      </div>
    
   </div>;
};

export default ManageBlog;
