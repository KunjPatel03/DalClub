import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "../../Assets/config/axiosConfig"
import { toast } from "react-toastify"
import EventBanner from "../../Assets/images/event-banner.jpg";
import PageBanner from "../../Components/Users/PageBanner"
import RegisteredEventCard from "../../Components/Users/Events/RegisteredEventCard"

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState(null)
  useEffect(() => {
    const fetchEvents = async () => {
      let events = await axios.get(`/events/bookedEvents/${1}`).then(res => {
        return res.data.success ? res.data.events : []
      }).catch(err => {
        toast.error(err?.response?.data?.message || "Something went wrong")
        return []
      })
      setRegisteredEvents(events)
    }
    fetchEvents()
  }, [])
  return (
    <>
      <PageBanner title="Registered events" bannerImage={EventBanner} />
      <Box p={4}>
        <Typography fontSize="1.2rem" fontWeight="bold">Registered Events</Typography>
        <Grid container mb={3} mt={1}>
          {registeredEvents ? registeredEvents.length > 0 ? registeredEvents.map(
            ({ event: { id, name, coverImage, eventDate }, ticketsBooked }) => (
              <Grid key={id} item sm={12} md={6}>
                <RegisteredEventCard
                  id={id}
                  name={name}
                  coverImage={coverImage}
                  eventDate={eventDate}
                  ticketsBooked={ticketsBooked}
                />
              </Grid>
            )
          ) : "No registered events." : "Fetching events."}
        </Grid>
      </Box>
    </>
  )
}

export default RegisteredEvents