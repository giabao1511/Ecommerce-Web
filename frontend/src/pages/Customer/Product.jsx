import React, { useEffect, useRef } from 'react'
import Section, { SectionBody, SectionTitle } from "../../components/Customer/Section"
import { useParams } from "react-router-dom"
import { ProductCard, ProductView, Grid, Helmet, getRandom } from "../../imports/index"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getDetailProduct } from '../../redux/apiRequest'
import { clearDetailProduct } from '../../redux/productSlice'

const Product = () => {
  const slug = useParams().slug;
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.detailProduct)
  const allProducts = useSelector(state => state.product.allProducts)
  let relatedProduct = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getDetailProduct(slug))

    if (!allProducts) {
      dispatch(getAllProducts());
    } else {
      relatedProduct.current = getRandom(allProducts, 4)
    }

    return () => {
      dispatch(clearDetailProduct())
    }
  }, [dispatch, slug, allProducts]);

  return (
    product && <Helmet title={product.title}>
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
              relatedProduct.current && relatedProduct.current.map((item, index) => (
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