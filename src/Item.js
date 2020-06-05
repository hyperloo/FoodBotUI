import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "semantic-ui-react";

const Item = ({
  category,
  currency,
  name,
  price,
  quantity,
  tax_pct,
  imgs,
  deleteItem,
  changeTotal,
}) => {
  const [quant, changeQuant] = useState(quantity);
  let url;
  if (category === "Burgers") {
    url = imgs[0];
  } else if (category === "Indo-Chinese (Veg)") {
    url = imgs[1];
  } else if (category === "Indo-Chinese (Non-Veg)") {
    url = imgs[2];
  }

  useEffect(() => {
    changeTotal(quant * (price + price * tax_pct * 0.01));
  }, []);

  const addQty = useCallback(() => {
    changeQuant(quant + 1);
    changeTotal(price + price * tax_pct * 0.01);
  });
  const subQty = useCallback(() => {
    changeQuant(quant - 1);
    changeTotal(-(price + price * tax_pct * 0.01));
  });

  return (
    <div className="item">
      <img src={url} alt={category} />
      <div className="text">
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={11} computer={11}>
              <p>{category}</p>
              <p className="name">{name}</p>
              <p className="price">
                {currency === "INR" ? <span>&#8377;</span> : <span>&x24;</span>}{" "}
                {price} ( @ {tax_pct}% )
              </p>
              <p className="qty">
                <button onClick={addQty}>+</button>
                &nbsp;
                <span>{quant}</span>&nbsp;
                <button onClick={subQty} disabled={quant <= 0}>
                  -
                </button>
              </p>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={5} computer={5}>
              <p className="finalPrice">
                {currency === "INR" ? <span>&#8377;</span> : <span>&x24;</span>}{" "}
                {price * quant} + {quant * price * tax_pct * 0.01}
                <br />
                Total:{" "}
                <span style={{ fontSize: "135%" }}>
                  {currency === "INR" ? (
                    <span>&#8377;</span>
                  ) : (
                    <span>&x24;</span>
                  )}
                  {(price + price * tax_pct * 0.01) * quant}
                </span>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default Item;
