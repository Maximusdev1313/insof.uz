<template>
  <div>
    <div class="product shadow-3" >
      <div class="product__main">
        <div class="discount">
            <div class="discount__mark">
                Chegirma
            </div>
            <div class="discount__persent">
                17%
            </div>
        </div>
          <a href="#" class="product__link">
            <img
              class="img"
              src="https://olcha.uz/image/425x425/products/rEES4fDb0cYy8rm4TsLWVIoh1FQeCHDj7WIT4d977eQpHrVrxNQwJxKJVDzL."
              width="200"
              height="200"
              alt="title"
            />
          </a>
        <div class="product__spacer">
          <div class="product__title text-h5">Smartphone</div>
        </div>
        <div class="product__spacer">
          <div class="product__prices">
            <div class="product__price none-discount"> <del>500.000 so'm</del> </div>
            <div class="product__price with-discount">450.000 so'm</div>
          </div>
        </div>
        <div class="product__spacer">
          <div class="product__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
        <div class="product__spacer">
          <div class="button">
            <q-btn rounded class="btn full-width shadow-7">button</q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script >

<style lang="sass" scoped>
.product
    width: 200px
    height: 520px
    border: 1px solid #fffff
    border-radius: 10px
    margin: 20px auto
    // margin: 20px 20px 20px 0

.product__main
    width: 90%
    margin: 0 auto
    display: flex
    flex-direction: column
    justify-content: center
    // align-items: center
    // letter-spacing: 1em
    line-height: 1.75em

.product__spacer
    padding-top: 10px
.discount
    width: 100%
    height: 35px
    display: flex
    justify-content: space-betweenf
    align-items: center
    // background: linear-gradient(89.97deg, #33042e 52.52%, #8f1182 110.06%)
    color: #fff
    margin: 10px 0
.discount__mark, .discount__persent
    background-color: red
    padding: 0 10px
    border-radius: 10px
    text-align: center
.product__link
    width: 100%
    height: 200px
    display: flex
    justify-content: center
    align-items: center
.product__price
    width: 90%
    text-align: center
    font-size: 1.2em
    font-weight: bold
.product__description
    width: 100%
    height: 70px
    margin-top: 10px
.with-discount
    // background: linear-gradient(89.97deg, #33042e 52.52%, #8f1182 110.06%)
    background-color: red
    border-radius: 5px
    color: #fff
.button
    width: 80%
    margin: 0 auto
    margin-bottom: 20px
    display: flex
    justify-content: center
.btn
    background: linear-gradient(89.97deg, #33042e 52.52%, #8f1182 110.06%)
    color: #fff
</style>
