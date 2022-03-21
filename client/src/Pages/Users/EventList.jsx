import { useEffect, useState } from "react"
import { Typography, Box, Grid, TextField } from "@mui/material";
import EventCard from "../../Components/Users/Events/EventCard";
import PageBanner from "../../Components/Users/PageBanner";
import {styled} from '@mui/system'
import { toast } from "react-toastify";
import axios from "../../Assets/config/axiosConfig";

const CategoryTab = styled('div')(({ theme }) => ({
  padding: "5px",
  margin: "5px",
  marginLeft: "0",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "0.4s",
  "&.selected": {
    color: "white",
    padding: "8px",
    backgroundColor: theme.palette.primary.main,
  }
}))

const EventList = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState([])
  const CategoryList = ["All", "Movies", "Conference", "Drama", "Concert", "Game"];

  useEffect(() => {
    axios.get("/events").then(response => {
      if(response.data.success) {
        setEvents(response.data.events)
      }
    }).catch((err) => {
      toast.error(err?.response?.data?.message || "Something went wrong")
    })
  }, [])

  return (
    <>
      <PageBanner />
      <Box px={4} py={2}>
        <Grid container>
          <Grid xs={12} sm={3} item py={2} px={3}>
            <Typography fontSize={"1.2rem"} mb={1} fontWeight={"bold"}>
              Filters
            </Typography>
            <Box>
              {CategoryList.map((ele) => (
                <CategoryTab
                  key={ele}
                  className={`${activeFilter === ele ? "selected" : ""}`}
                  onClick={() => setActiveFilter(ele)}
                >
                  {ele}
                </CategoryTab>
              ))}
            </Box>
          </Grid>
          <Grid xs={12} sm={9} item py={2} px={3}>
            <TextField
              placeholder="Search Events"
              size="small"
              variant="outlined"
              fullWidth
            />
            <Grid container spacing={4} mb={3} mt={1}>
              {events.map(
                ({ id, name, coverImage, eventDate, silverMemberPrice }) => (
                  <Grid key={id} item sm={6} md={4}>
                    <EventCard
                      id={id}
                      name={name}
                      coverImage={coverImage}
                      eventDate={eventDate}
                      silverMemberPrice={silverMemberPrice}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EventList;
