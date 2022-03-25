import { Box, Typography, Grid } from "@mui/material";
import { format, parseISO } from "date-fns";
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const RegisteredEventCard = ({ id, name="", coverImage, eventDate, ticketsBooked }) => {
  return (
    <Box padding={1.25}>
      <Grid
        container
        height="300px"
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": {
            boxShadow: "0 0 5px -1px",
          }
        }}
        borderRadius={1}
        border={"1px solid lightgray"}
      >
        <Grid item xs={6} lg={6}>
          <Box
            component={"img"}
            sx={{ objectFit: "cover" }}
            src={coverImage || `https://via.placeholder.com/600x400?text=${name.replace(" ", "+")}`}
            alt={name}
            width="100%"
            height="100%"
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <Box p={2.5}>
            <Typography
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              color="primary.main"
              textOverflow={"ellipsis"}
              overflow="hidden"
              whiteSpace={"nowrap"}
            >
              {name}
            </Typography>
            <Box display={"flex"} alignItems="center" mb={0.5} fontSize={"0.8rem"} color="grey.700">
              <Box color="primary.main"><CalendarTodayRoundedIcon style={{ fontSize: "1.3rem" }} /></Box>
              &nbsp;{eventDate ? format(parseISO(eventDate), "MM-dd-yyyy") : ""}
            </Box>
            <Typography color="secondary.light">
              Booked {ticketsBooked} places.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisteredEventCard;
