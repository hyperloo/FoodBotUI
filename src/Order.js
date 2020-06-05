import React, { Component } from "react";
import Item from "./Item";

import { Grid, Image } from "semantic-ui-react";

class UserPage extends Component {
  state = {
    items: this.props.items,
    total: 0,
    curr: this.props.items[0].currency,
  };

  deleteItem = (name) => {
    this.setState({
      items: this.state.items.filter((item) => item.name !== name),
    });
  };

  changeTotal = async (price) => {
    await this.setState((prevState) => ({ total: prevState.total + price }));
  };

  searchItems = (txt) => {
    const searchedItems = this.props.items.filter((item) => {
      return item.name.toLowerCase().includes(txt.toLowerCase());
    });
    this.setState({ items: searchedItems });
  };

  render() {
    const { name, orderId, zipcode, city, state, street } = this.props;
    const { items, total, curr } = this.state;

    const imgs = [
      "https://images5.alphacoders.com/433/433534.jpg",
      "https://myfoodstory.com/wp-content/uploads/2016/03/one-pan-veg-noodle-and-manchurian-stir-fry-indo-chinese-recipe.1024x1024-4.jpg",
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Pooja_Thakur/chicken_chilli_400.jpg",
    ];

    const itemsList = (
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <Item
              {...item}
              imgs={imgs}
              deleteItem={this.deleteItem}
              changeTotal={this.changeTotal}
            />
          </li>
        ))}
      </ul>
    );

    return (
      <div className="orders">
        <Grid>
          <Grid.Row>
            <Grid.Column className="titleCol" mobile={16}>
              <Image
                className="face"
                size="small"
                src="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
              <div className="address">
                <p>{name}</p>
                <span className="id">
                  {street}, {city}
                </span>
                <span>
                  {state} - {zipcode}
                </span>
              </div>
            </Grid.Column>
            <Grid.Column className="hrDiv" mobile={16}></Grid.Column>
            <Grid.Column className="OrderId" mobile={16}>
              <span>
                <span>Order-Id</span> - <span>{orderId}</span>
              </span>{" "}
            </Grid.Column>
            <Grid.Column mobile={16} className="search">
              <input
                type="text"
                placeholder="Search Booked Item"
                onChange={(e) => this.searchItems(e.target.value)}
              />
              <span>
                Order:&nbsp;
                {curr === "INR" ? (
                  <span>&#8377;</span>
                ) : (
                  <span>&x24;</span>
                )}{" "}
                {total}
              </span>
            </Grid.Column>
            <Grid.Column className="items" mobile={16}>
              {itemsList}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default UserPage;
