import React from 'react'
import Section, { SectionBody, SectionTitle } from '../../components/Customer/Section'
import { Link } from "react-router-dom"
import { banner, policy, sliderData, productData } from "../../imports/assets"
import { Grid, PolicyCard, HeroSlider, Helmet, ProductCard } from "../../imports/index"

const Home = () => {
  return (
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
              productData.getProducts(4).map((item, index) => (
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
              productData.getProducts(8).map((item, index) => (
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
              productData.getProducts(12).map((item, index) => (
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