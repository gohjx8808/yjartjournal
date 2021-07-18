import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Add, Remove } from '@material-ui/icons';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { increaseQuantity, reduceQuantity } from '../src/productReducers';
import productStyle from '../src/productStyle';

type CartItemCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  [key: string]: string | undefined | number
}

const Cart = () => {
  const styles = productStyle();
  const cartTitle = ['Item', 'Price (RM)', 'Quantity', 'Total (RM)'];
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const dispatch = useAppDispatch();

  const onChangeSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'selectAll') {
      if (event.target.checked) {
        const allIds = [] as string[];
        let total = 0;
        cartItems.map((item) => {
          allIds.push(item.id);
          total += +item.price * item.quantity;
          return null;
        });
        setSelectedItems(allIds);
        setTotalAmount(total);
      } else {
        setSelectedItems([]);
        setTotalAmount(0);
      }
    } else {
      let rawTotal = totalAmount;
      if (event.target.checked) {
        setSelectedItems([...selectedItems, event.target.id]);
        setTotalAmount(rawTotal += +event.target.getAttribute('data-price')!);
      } else {
        const splicedArr = [...selectedItems];
        splicedArr.splice(splicedArr.indexOf(event.target.id), 1);
        setSelectedItems(splicedArr);
        setTotalAmount(rawTotal -= +event.target.getAttribute('data-price')!);
      }
    }
  };

  const onReduceItemQuantity = (cartItemID:string, cartItemPrice:string) => {
    dispatch(reduceQuantity(cartItemID));
    if (selectedItems.includes(cartItemID)) {
      const prevAmount = totalAmount;
      setTotalAmount(prevAmount - +cartItemPrice);
    }
  };

  const onIncreaseItemQuantity = (cartItemID:string, cartItemPrice:string) => {
    dispatch(increaseQuantity(cartItemID));
    if (selectedItems.includes(cartItemID)) {
      const prevAmount = totalAmount;
      setTotalAmount(prevAmount + +cartItemPrice);
    }
  };

  return (
    <Grid container justify="center" alignItems="center" className={styles.cartCardContainer} spacing={2}>
      <Grid item lg={10} xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={2}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Checkbox
                    color="secondary"
                    onChange={onChangeSelect}
                    indeterminate={
                    selectedItems.length < cartItems.length && selectedItems.length > 0
                  }
                    checked={selectedItems.length > 0}
                    id="selectAll"
                    inputProps={{ 'aria-label': 'checkAll' }}
                  />
                </Grid>
              </Grid>
              {cartTitle.map((title) => (
                <Grid item xs={title === 'Item' ? 4 : 2} key={title}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Typography className={styles.cartTitle}>{title}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={10} xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            {cartItems.map((cartItem, index) => (
              <Grid
                container
                justify="center"
                alignItems="center"
                key={cartItem.id}
                className={`${styles.cartItemCard} ${index === 0 ? '' : styles.topBorderedCartItemCard}`}
              >
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Checkbox
                      checked={selectedItems.includes(cartItem.id)}
                      color="secondary"
                      onChange={onChangeSelect}
                      id={cartItem.id}
                      inputProps={{
                        'aria-label': cartItem.id,
                        'data-price': +cartItem.price * cartItem.quantity,
                      } as CartItemCheckboxProps}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Typography>{cartItem.name}</Typography>
                    {cartItem.imgURL.map((localFile) => {
                      const imageData = getImage(localFile)!;
                      return (
                        <Box
                          className={styles.cartItemImageContainer}
                          key={imageData.images.fallback?.src}
                        >
                          <GatsbyImage
                            image={imageData}
                            alt={cartItem.id}
                            imgClassName={styles.cartItemImage}
                          />
                        </Box>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Typography>{cartItem.price}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <IconButton onClick={() => onReduceItemQuantity(cartItem.id, cartItem.price)}>
                      <Remove />
                    </IconButton>
                    <Typography>{cartItem.quantity}</Typography>
                    <IconButton onClick={() => onIncreaseItemQuantity(cartItem.id, cartItem.price)}>
                      <Add />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Typography>
                      {(+cartItem.price * cartItem.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={10} xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={10}>
                <Typography className={styles.totalTitle}>Total</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={styles.totalTitle}>
                  RM
                  {' '}
                  {totalAmount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
