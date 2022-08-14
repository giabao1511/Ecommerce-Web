import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import Section, { SectionBody, SectionTitle } from '../../components/Customer/Section'
import { banner, policy, sliderData } from "../../imports/assets"
import { getRandom, Grid, Helmet, HeroSlider, PolicyCard, ProductCard } from "../../imports/index"
import { getAllProducts } from '../../redux/apiRequest'

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.product.allProducts)

  useEffect(() => {
    if (!allProducts) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts])

  return (
    allProducts &&
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={sliderData}
        control={true}
        auto={true}
        timeOut={3000} />

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {
              policy.map((item, index) => (
                <Link to="/policy" key={index}>
                  <PolicyCard
                    name={item.name}
                    description={item.description}
                    icon={item.icon} />
                </Link>
              ))
            }
          </Grid>
        </SectionBody>
      </Section>

      {/* best selling section */}
      <Section>
        <SectionTitle>
          top sản phẩm bán chạy trong tuần
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {
              getRandom(allProducts, 4).map((item, index) => (
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

      {/* new product section */}
      <Section>
        <SectionTitle>
          sản phẩm mới
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {
              getRandom(allProducts, 8).map((item, index) => (
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

      {/* banner section */}
      <Section>
        <SectionBody>
          <Link to="/catalogue">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>

      {/* products section */}
      <Section>
        <SectionTitle>
          sản phẩm phổ biến
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {
              getRandom(allProducts, 12).map((item, index) => (
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

export default Home