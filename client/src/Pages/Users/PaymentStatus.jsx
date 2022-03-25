import { useEffect } from "react"
import { Box, CircularProgress, Typography } from "@mui/material"
import { useStripe } from '@stripe/react-stripe-js';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "../../Assets/config/axiosConfig";

const PaymentStatus = () => {
  const stripe = useStripe();
  const navigate = useNavigate()

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    if(!stripe) return
    if(!clientSecret) return
    stripe.retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
        let entity = paymentIntent.description.includes("EVENT") ? "event" : "product"
        switch (paymentIntent.status) {
          case 'succeeded':
            if(entity === "event"){
              // register for event then navigate to registered events
              axios.post("/events/bookEvent", {
                paymentIntent: paymentIntent.id,
                userId: 1,
                ticketType: "Silver"
              }).then(response => {
                toast.success(`Payment successfully processed for ${entity}.`);
                navigate("/registeredEvents")
                return
              }).catch(err => {
                toast.error(err?.response?.data?.message || "Something went wrong.")
              })
            } else {
              // complete product purchase
            }
            break;
          case 'processing':
            toast.info("Payment processing. We'll update you when payment is received.");
            break;
          case 'requires_payment_method':
            toast.error('Payment failed. Please try again later.');
            break;
          default:
            toast.error('Something went wrong.');
            break;
        }
        navigate("/registeredEvents")
      });
  }, [stripe]);

  return (
    <Box flexDirection={"column"} height={"80vh"} width="100vw" display="flex" alignItems={"center"} justifyContent="center">
      <CircularProgress />
      <Typography mt={2} fontSize="1.2rem">Processing payment</Typography>
    </Box>
  )
}

export default PaymentStatus