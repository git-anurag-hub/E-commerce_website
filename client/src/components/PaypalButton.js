import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class PaypalButton extends React.Component {
  render() {
    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      console.log("The payment was succeeded!", payment);
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
      this.props.onSuccess(payment);
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
      this.props.onCancel(data);
    };

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
      this.props.onError(err);
    };

    let env = "production"; // you can set here to 'production' for production
    let currency = "INR"; // or you can set this value from your props or state
    let total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox:
        "ASnff2ThEP6d-cKkN7sW05OKpC4BzNVT4MZ-FI0htDtDCJTQqvRvPakwoS7vpPcI__QbVR8diM-Jig7r",
      production:
        "AQMnk7yuWfDISSxKM3THicOxnlSD-Uc6wAZIhedg0pqgrTPka8iGywSJZLfvL-z-uj8nasmcI9L8MdqV",
    };
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    return (
      <div className="container">
        <table className="highlight">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Price</th>
            </tr>
            {this.props.items.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>Rs. {item.price * item.quantity}</td>
                </tr>
              );
            })}
            <tr>
              <th>Total</th>
              <th>Rs. {total}</th>
            </tr>
          </thead>
        </table>
        <div className="center" style={{ paddingTop: "10px" }}>
          <PaypalExpressBtn
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={{
              size: "large",
              color: "blue",
              shape: "rect",
              label: "checkout",
            }}
          />
        </div>
      </div>
    );
  }
}
