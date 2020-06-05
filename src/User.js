import React, { Component } from "react";
import moment from "moment";

import { Grid, Image } from "semantic-ui-react";

class UserPage extends Component {
  state = {
    likes: this.props.likes,
    dislikes: this.props.dislikes,
  };

  handleDelete = (type, name) => {
    if (type === "likes")
      this.setState({ likes: this.state.likes.filter((a) => a !== name) });
    else if (type === "dislikes")
      this.setState({
        dislikes: this.state.dislikes.filter((a) => a !== name),
      });
  };

  render() {
    const { createdAt, about, address, phone, name, id } = this.props;

    const { likes, dislikes } = this.state;

    return (
      <div className="user">
        <Grid>
          <Grid.Row>
            <Grid.Column className="titleCol" mobile={16}>
              <Image
                className="face"
                size="small"
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                circular
              />
              <p>
                {name} <br /> <span className="id">@ {id}</span>
              </p>
            </Grid.Column>
            <Grid.Column className="hrDiv" mobile={16}></Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={8}
              className="detailDiv"
            >
              <p>
                <span className="subTitle">Phone: </span>
                <span className="hrSpan"></span>
                <span className="detail">{phone}</span>
              </p>
              <p>
                <span className="subTitle">Address: </span>
                <span className="hrSpan"></span>
                <span className="detail">{address}</span>
              </p>
              <p>
                <span className="subTitle">Registered At: </span>
                <span className="hrSpan"></span>
                <span className="detail">
                  {moment(createdAt).format("MMM Do YYYY")}
                </span>
              </p>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={8}
              className="aboutDiv"
            >
              <p>
                <span className="subTitle">About: </span>
                <span className="hrSpan"></span>
                <span className="detail">{about}</span>
              </p>
              <div className="likes">
                {" "}
                Likes
                {likes.map((like, i) => (
                  <span key={i}>
                    {like}{" "}
                    <button onClick={() => this.handleDelete("likes", like)}>
                      &#10005;
                    </button>
                  </span>
                ))}
              </div>
              <div className="dislikes">
                {" "}
                Dislikes
                {dislikes.map((dislike, i) => (
                  <span key={i}>
                    {dislike}{" "}
                    <button
                      onClick={() => this.handleDelete("dislikes", dislike)}
                    >
                      &#10005;
                    </button>
                  </span>
                ))}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default UserPage;
