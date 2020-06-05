import React from "react";
import NavBar from "./NavBar";
import ProfilePage from "./User";
import OrdersPage from "./Order";
import axios from "axios";

import { Container, Loader, Image } from "semantic-ui-react";

class App extends React.Component {
  state = {
    curr: "Profile",
    data: null,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const res = await axios.get("https://indapi.kumba.io/webdev/assignment");
      this.setState({ data: res.data, loading: false });
    } catch (err) {
      if (err.response) {
        this.setState({ loading: false });
        console.log(err.response.data);
      }
    }
  }

  changeTab = (tab) => {
    this.setState({ curr: tab });
  };

  render() {
    const { curr, data, loading } = this.state;
    return (
      <div className="App">
        <NavBar />
        <div className="hr" />
        <Container className="subNav">
          <p
            className={`btn ${curr === "Profile" && "active"}`}
            onClick={() => this.changeTab("Profile")}
          >
            Profile
          </p>
          <p
            className={`btn ${curr === "Orders" && "active"}`}
            onClick={() => this.changeTab("Orders")}
          >
            Orders
          </p>
        </Container>
        <Container className="broadHead">
          <div>
            <p>Your {curr}</p>
          </div>
        </Container>
        <Container text className="page">
          {loading ? (
            <>
              {/* <Dimmer active> */}
              <Loader active size="large">
                Loading
              </Loader>
              {/* </Dimmer> */}

              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </>
          ) : (
            data && (
              <>
                {curr === "Profile" && (
                  <ProfilePage createdAt={data.createdAt} {...data.user} />
                )}
                {curr === "Orders" && (
                  <OrdersPage
                    {...data.restaurant}
                    orderId={data.order_id}
                    items={data.items}
                  />
                )}
              </>
            )
          )}
        </Container>
      </div>
    );
  }
}

export default App;
