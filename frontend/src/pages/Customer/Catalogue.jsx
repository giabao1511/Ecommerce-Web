import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/apiRequest'
import { categories, colors, sizes } from "../../imports/assets"
import { Helmet, InfinityList, Button, Checkbox } from "../../imports/index"

const Catalogue = () => {
  const dispatch = useDispatch()

  const initFilter = {
    category: [],
    color: [],
    size: []
  }

  const allProductsList = useSelector(state => state.product.allProducts)
  const [products, setProducts] = useState(allProductsList);
  const [filter, setFilter] = useState(initFilter)
  const filterRef = useRef(null);
  const showHideFilter = () => filterRef.current.classList.toggle("active")

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] })
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(e => e !== item.categorySlug)
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter(e => e !== item.color)
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter(e => e !== item.size)
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  }

  const updateProducts = useCallback(
    () => {
      let temp = allProductsList

      if (filter.category.length > 0) {
        temp = temp.filter(e => filter.category.includes(e.categorySlug))
      }

      if (filter.color.length > 0) {
        temp = temp.filter(e => {
          const check = e.colors.find(color => filter.color.includes(color))
          return check !== undefined
        })
      }

      if (filter.size.length > 0) {
        temp = temp.filter(e => {
          const check = e.size.find(color => filter.size.includes(color))
          return check !== undefined
        })
      }
      setProducts(temp);
    },
    [filter, allProductsList]
  )

  useEffect(() => {
    updateProducts()
  }, [updateProducts])

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <Helmet title="Sản phẩm">
      {products &&
        <div className="catalogue">
          <div className="catalogue__filter" ref={filterRef}>
            <div className="catalogue__filter__close" onClick={showHideFilter}>
              <i className="bx bx-left-arrow-alt"></i>
            </div>
            <div className="catalogue__filter__widget">
              <div className="catalogue__filter__widget__title">
                danh mục sản phẩm
              </div>
              <div className="catalogue__filter__widget__content">
                {categories.map((item, index) => (
                  <div className="catalogue__filter__widget__content__item" key={index} >
                    <Checkbox
                      checked={filter.category.includes(item.categorySlug)}
                      label={item.display}
                      onChange={input => filterSelect("CATEGORY", input.checked, item)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalogue__filter__widget">
              <div className="catalogue__filter__widget__title">
                màu sắc
              </div>
              <div className="catalogue__filter__widget__content">
                {colors.map((item, index) => (
                  <div className="catalogue__filter__widget__content__item" key={index}>
                    <Checkbox
                      checked={filter.color.includes(item.color)}
                      label={item.display}
                      onChange={input => filterSelect("COLOR", input.checked, item)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalogue__filter__widget">
              <div className="catalogue__filter__widget__title">
                kích cỡ
              </div>
              <div className="catalogue__filter__widget__content">
                {sizes.map((item, index) => (
                  <div className="catalogue__filter__widget__content__item" key={index}>
                    <Checkbox
                      checked={filter.size.includes(item.size)}
                      label={item.display}
                      onChange={input => filterSelect("SIZE", input.checked, item)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalogue__filter__widget">
              <div className="catalogue__filter__widget__content">
                <Button size="sm" onClick={() => setFilter(initFilter)}>xóa bộ lọc</Button>
              </div>
            </div>
          </div>
          <div className="catalogue__filter__toggle">
            <Button size="sm" onClick={showHideFilter}>bộ lọc</Button>
          </div>
          <div className="catalogue__content">
            {products.length === 0 && (
              <h2 style={{ textAlign: 'center' }}>Không có sản phẩm nào trùng khớp!</h2>
            )}
            <InfinityList data={products} />
          </div>
        </div>
      }
    </Helmet>
  )
}

export default Catalogue