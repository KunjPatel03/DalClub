import PageBanner from "../../Components/Users/PageBanner"
import EventDetailsBanner from "../../Assets/images/eventdetails-banner.jpg";
import { Box, Typography, Chip, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import {styled} from '@mui/system'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify"
import { format, parseISO } from "date-fns"
import { CalendarMonthRounded, AccessTimeRounded } from '@mui/icons-material';
import PaymentModal from "../../Components/Users/Events/PaymentModal";

const ContentContainer = styled(Box)(({ theme }) => ({
  margin: "auto",
  marginBottom: theme.spacing(8),
  color: theme.palette.secondary.main,
  [theme.breakpoints.up('xs')]: {
    width: "90%"
  },
  [theme.breakpoints.up('sm')]: {
    width: "90%"
  },
  [theme.breakpoints.up('md')]: {
    width: "870px"
  },
  [theme.breakpoints.up('lg')]: {
    width: "1170px"
  }
}))

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null)
  const [numOfTicket, setNumOfTicket] = useState()
  const [showPaymentModel, setShowPaymentModal] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const { eventId } = useParams()
  
  useEffect(() => {
    axios.get(`/events/eventDetails/${eventId}`).then(response => {
      setEventDetails(response.data.success ? response.data.eventDetails : {})
    }).catch(err => {
      setEventDetails({})
      toast.error(err?.response?.data?.message || "Something went wrong")
    })
  }, [])

  const handleTicketChange = (e) => setNumOfTicket(e.target.value);

  const togglePaymentModal = () => {
    if(!numOfTicket) {
      toast.error("Please select number of ticket to book.")
      return
    } else if(numOfTicket > eventDetails.remainingSilverSeats) {
      toast.error(`Number of ticket to book should be less than ${eventDetails.remainingSilverSeats}.`)
      return
    } else {
      setPaymentAmount(numOfTicket * eventDetails.silverMemberPrice)
      setShowPaymentModal(true)
    }
  }

  const closePaymentModal = () => setShowPaymentModal(false)
  
  return (
    <>
      <PageBanner title="Event Details" bannerImage={EventDetailsBanner} />
      <ContentContainer>
        {eventDetails ? eventDetails.id ? <>
          <Typography my={2} fontWeight="bold" fontSize={"1.2rem"}>
            <Link to="/events">
              <Box component={"span"} color="primary.main">
                Events
              </Box>
            </Link>{" "}
            | {eventDetails.name}
          </Typography>
          <Box
            component={"img"}
            height="45vh"
            width={"100%"}
            src={eventDetails.coverImage || `https://via.placeholder.com/700x250?text=${eventDetails.name.replace(" ", "+")}`}
            alt="Event title"
          />
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent="space-between"
            mt={3}
          >
            <Box>
              <Box display="flex" alignItems={"start"}>
                <Typography fontSize={"1.3rem"} fontWeight="bold" mr={1}>
                  {eventDetails.name}
                </Typography>
                <Chip
                  label={`${eventDetails.remainingSilverSeats} tickets left`}
                  variant="primary"
                  color="primary"
                  size="small"
                  sx={{
                    px: 1,
                    color: "white",
                    fontSize: "0.7rem",
                    height: "20px",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box display="flex" alignItems={"center"}>
              <Box color="primary.main"><CalendarMonthRounded style={{ fontSize: "1.3rem" }} /></Box>
                &nbsp;{eventDetails.eventDate ? format(parseISO(eventDetails.eventDate), "MMMM do, yyyy") : ""}
                &ensp;|&ensp;<Box color="primary.main"><AccessTimeRounded style={{ fontSize: "1.3rem" }} /></Box>
                &nbsp;{format(parseISO(eventDetails.eventDate), "hh:mm a")}
              </Box>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 140 }} size="small">
                <InputLabel id="select-ticket">Select tickets</InputLabel>
                <Select
                  labelId="select-ticket"
                  label="Select tickets"
                  MenuProps={{ PaperProps: { style: { maxHeight: "175px" } } }}
                  value={numOfTicket}
                  onChange={handleTicketChange}
                >
                  {Array.from({length: eventDetails.remainingSilverSeats}).map((ele, i) => (
                    <MenuItem key={`seat-${i}`} value={i+1}>{i+1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                sx={{ color: "white", textTransform: "none", marginLeft: 2 }}
                onClick={togglePaymentModal}
              >
                Book Event
              </Button>
            </Box>
          </Box>
          <Box
            component={"p"}
            dangerouslySetInnerHTML={{ __html: eventDetails.description }}
            my={2}
            color="secondary.main"
            lineHeight={1.5}
          />
        </> : "Cannot find requested event." : "Fetching event details."}
        <PaymentModal open={showPaymentModel} handleClose={closePaymentModal} amount={paymentAmount} />
      </ContentContainer>
    </>
  );
}

export default EventDetails