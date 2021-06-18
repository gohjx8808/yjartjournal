import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';
import productStyle from '../src/productStyle';

const Products = () => {
  const styles = productStyle();
  const allPriceQuery = graphql`
    query ProductPrices {
      prices: allStripePrice(
        filter: { active: { eq: true } }
        sort: { fields: [unit_amount] }
      ) {
        edges {
          node {
            unit_amount
            unit_amount_decimal
            product {
              id
              images
              name
              type
            }
            active
            currency
            id
          }
        }
      }
    }`;

  return (
    <StaticQuery
      query={allPriceQuery}
      render={({ prices }) => {
        const allProduct:products.productData[] = [];
        const extractedPrices:products.queryProductData[] = prices.edges;
        extractedPrices.forEach((price) => {
          const realPrice = price.node;
          const extractedProduct = realPrice.product;
          const { product, ...otherDetail } = realPrice;
          extractedProduct!.prices = otherDetail;
          allProduct.push(extractedProduct!);
        });
        return (
          <Grid container justify="center" alignItems="center" direction="row" spacing={5} className={styles.rootContainer}>
            {allProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        );
      }}
    />
  );
};

export default Products;
