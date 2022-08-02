import React, { useEffect } from 'react'
import Helmet from "../components/Helmet"
import Grid from "../components/Grid"
import productData from "../assets/fake-data/products"
import Section, { SectionBody, SectionTitle } from "../components/Section"
import { useParams } from "react-router-dom"
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'

const Product = props => {
  const slug = useParams().slug;
  const product = productData.getProductBySlug(slug);
  const relatedProduct = productData.getProducts(8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>
          khám phá thêm
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={10}
          >
            {
              relatedProduct.map((item, index) => (
                <ProductCard
                  key={index}
                  img01={item.image01}
                  img02={item.image02}
                  name={item.title}
                  price={Number(item.price)}
                  slug={item.slug}
                />
              ))
            }
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  )
}

export default Product