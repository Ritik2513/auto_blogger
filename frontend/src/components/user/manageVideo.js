import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import app_config from "../../config";
import TimeAgo from "javascript-time-ago";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageVideo = () => {
  const timeAgo = new TimeAgo("en-US");
  const url = app_config.backend_url;
  const [selFile, setSelFile] = useState("");

  const [videoArray, setVideoArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const videoform = {
    title: "",
    file: "",
    uploadedby: currentUser._id,
    createdAt: new Date(),
  };

  const deleteData = (id) => {
    fetch(url + "/video/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchVideos();
        toast.success("Successfully Deleted!!", {
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

  const navigate = useNavigate();

  const fetchVideos = () => {
    fetch(url + "/video/getbyuser/" + currentUser._id).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setLoading(false);
          setVideoArray(data);
        });
      }
    });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const videoSubmit = (formdata) => {
    formdata.file = selFile;
    console.log(formdata);

    fetch(url + "/video/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Video Uploaded",
        });
        fetchVideos();
      }
    });
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];

    const fd = new FormData();
    fd.append("myfile", file);

    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        setSelFile(file.name);

        Swal.fire({
          icon: "success",
          title: "Success!!",
          text: "Video Selected",
        });
      }
    });
  };

  const addVideo = () => {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h3 className="mb-0">Add New Video</h3>
        </div>
        <div className="card-body ">
          <Formik initialValues={videoform} onSubmit={videoSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row ">
                  <div className="col-md-6 ">
                    <TextField
                      className="w-100 mb-4"
                      label="Title"
                      variant="filled"
                      id="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      className="form-control w-100 mb-4"
                      type="file"
                      onChange={uploadFile}
                    />
                  </div>
                  <div className="col-md-2">
                    <Button
                      type="submit"
                      variant="contained"
                      className="w-100"
                      color="error"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  const transcribe = (videoid) => {
    fetch(url + "/util/transcribe/" + videoid).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data.transcription);
          sessionStorage.setItem(
            "transcription",
            JSON.stringify(data.transcription)
          );
          navigate("/user/addblog");
        });
      }
    });
  };

  const manageVideo = () => {
    return (
      <div className="row ">
        {videoArray.map(({ _id, title, file, thumbnail, createdAt }) => (
          <div className="col-md-3 mt-4 ">
            <div className="card">
              <div className="img-fluid"
                style={{
                  height: "20rem",
                  // background: "url(" + url + "/uploads/" + file + ")",
                  background:
                    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBqFYOHSiiHc8fCrnTbYRK4Iw0xGZUGF4ECyRelvW5Ji1lL28jH0wQRRcqjiJCRCktO2A&usqp=CAU)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="card-body">
                <h3 className="my-0">{title}</h3>
                <p className="my-0 text-muted">
                  {timeAgo.format(new Date(createdAt))}
                </p>
                <Stack spacing={2} direction="row" className="mt-2">
                      <Button variant="contained" color="success" onClick={(e) => transcribe(_id)}>Transcribe</Button>
                      
                    <Button variant="contained" style={{background:"#cc0000"}} onClick={(e) => deleteData(_id)}>Remove</Button>
                    </Stack>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    
    <div className="addvideo-back">
      <section class="section home-5-bg" id="home">
        <div
          id="particles-js"
          style={{
            backgroundImage: `url("https://www.teahub.io/photos/full/177-1771239_yellow-tree-blur-background-hd.jpg")`,
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
                     Auto Blog 
                    </h1>
                    <p class="text-white-70 mt-4 f-15 mb-0">
                    Use Auto Blogger to write article content, titles, intros, outlines, or ideas like a content writing expert in no time. Boost your traffic by generating unlimited quality articles for your blog.
                    </p>
                    <div class="mt-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container ">
        {addVideo()}
        <div className="mt-5">
          <h2 className="mb-0 ">Manage Videos</h2>
          <hr />
          {manageVideo()}
        </div>
      </div>
    </div>
  );
};

export default ManageVideo;
