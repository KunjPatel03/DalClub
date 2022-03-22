import { Box, Typography, Grid } from "@mui/material";
import { format, parseISO } from "date-fns";

const EventCard = ({ id, name="", coverImage, eventDate, silverMemberPrice }) => {
  return (
    <Box
      key={id}
      borderRadius={1}
      border={"1px solid lightgray"}
      margin={1.25}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0 0 5px -1px",
        },
      }}
    >
      <img
        src={coverImage || `https://via.placeholder.com/600x400?text=${name.replace(" ", "+")}`}
        alt={name}
        width="100%"
        height="100%"
      />
      <Grid
        container
        p={1}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography fontWeight={"bold"} color="primary.main">
            {name}
          </Typography>
          <Typography mt={-0.5} fontSize={"0.8rem"} color="grey.700">
            {eventDate ? format(parseISO(eventDate), "MM-dd-yyyy") : ""}
          </Typography>
        </Box>
        <Typography fontWeight={"bold"} color="secondary.light">
          ${silverMemberPrice}
        </Typography>
      </Grid>
    </Box>
  );
};

export default EventCard;
