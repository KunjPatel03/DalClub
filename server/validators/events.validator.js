const { body, validationResult } = require("express-validator")

const bookEventSchema = [
  body("userId").exists().withMessage("User id is required.").isNumeric().withMessage("User id must be a number"),
  body("amount").exists().withMessage("Amount is required.").isNumeric().withMessage("Amount must be a number"),
  body("ticketsBooked").exists().withMessage("Number of tickets is required.").isNumeric().withMessage("Number of tickets must be a number"),
  body("paymentStatus").exists().withMessage("Payment status is required.").isIn(["Recieved", "Pending"]).withMessage("Invalid payment status"),
  body("ticketType").exists().withMessage("Ticket type is required.").isIn(["Silver", "Gold", "Platinum"]).withMessage("Invalid ticket type."),
]

const validator = (req, res, next) => {
  let errors = validationResult(req)
  if(errors.isEmpty()) {
    next()
  } else {
    res.status(400).send({ success: false, errors: errors.mapped() })
  }
}

const validateEvent = (value) => {
  switch (value) {
    case "bookEvent":
      return [...bookEventSchema, validator]
    default:
      break;
  }
}

module.exports = validateEvent;
