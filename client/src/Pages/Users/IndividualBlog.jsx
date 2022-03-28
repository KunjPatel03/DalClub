import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CardActionArea,
  CardMedia,
  CardActions,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

import PageBanner from "../../Components/Users/PageBanner";
import axios from "../../Assets/config/axiosConfig";
import BlogBanner from "../../Assets/images/BlogBanner.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const IndivdualBlog = () => {
    const navigate = useNavigate();
    let { jobId } = useParams();
    const [blog, setBlog] = useState({});
  useEffect(() => {
    axios.get(`/careers/${jobId}`)
        .then(response => {
            setBlogs(response.data.success ? response.data.blog : {});
        }).catch(err => {
            setBlog([]);
            toast.error(err?.response?.data?.message || "Something went wrong")
        })
}, [jobId])

  // const handleClick = job => {
  //     setActiveJob(job);
  // };

  // const handleSubmit = (jobId) => {
  //     navigate(`/careers/application/${jobId}`)
  // }

  return (
    <div>
      <PageBanner title="Blogs" bannerImage={BlogBanner} />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs></Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Button
            variant="contained"
            // onClick={() => handleSubmit(activeJob.job_id)}
          >
            New
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4} mb ={3}>
        <Card key={blog.blog_id} sx={{ mb: 3 }}>
                      <CardActionArea>
                        <CardMedia
                          image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                          {blog.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                          {blog.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            p: 1,
                            m: 1,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                          }}
                        >
                          <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                          <Box ml={2}>
                            <Typography variant="subtitle2" component="p">
                              Guy Clemons
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              component="p"
                            >
                              {blog.createdAt}
                            </Typography>
                          </Box>
                        </Box>
                      </CardActions>
                    </Card>
        </Grid>
      </Box>
    </div>
  );
};

export default IndivdualBlog;
