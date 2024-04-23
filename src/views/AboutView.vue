<template>
  <div class="about">
    <div class="page">
      <h1>About me</h1>

      <p>
        I am Morphée213, a developer.

      </p>

      <p>
        I have developed an application that allows for the buying and selling of advertising spaces in 32x32 pixel
        parcels. On a screen that is 416px wide, the size of the parcels automatically adjusts based on the screen.

      </p>

      <p>
        The principle is simple: 20 290 parcels are available for sale in what I have named the "primary market". They
        are organized in lines of 13 parcels each. The first parcels are sold for 10 μBTC each, and their price doubles
        every 780 parcels. Thus, the best-located parcels are also the cheapest.

      </p>

      <p>
        Once you have bought parcels on the primary market, you can display your image and add a hyperlink. If you wish,
        you also have the option to resell your parcel on the secondary market at the price of your choice.

      </p>

      <p>

        Or, once you have purchased a plot of pixels, you can also rent it out.

      </p>

      <p>
        There are also special parcels, including the "bronze", "silver", "gold", and "diamond" parcels, which offer the
        possibility to display an image of your choice on the banners located above the pixels. In addition to your
        32x32 pixel image on your parcel, you can display a 416x209 pixel image on one of the four panels of the banner!
        There are also parcels in the navigation bar, which have the advantage of always being visible on the screen, on
        all pages of the application.

      </p>

      <p>
        The total price of the parcels on the primary market amounts to 1 million bitcoins, hence the name of the
        application.

      </p>

      <p>
        I am also considering adding an auction function in future versions. I am also thinking about making it so that
        the person who buys the last parcel on the primary market (if that ever happens), becomes the owner of the app
        (but I am not yet sure how to do this legally).

      </p>

      <p>
        I created this application because my wife and I were victims of a scam regarding our house, which is
        uninhabitable. We have to repay a loan for this house and do not have the means to rehouse ourselves or finance
        the legal proceedings, which are very costly and will last several years. I am aware that we will probably not
        sell all the parcels (otherwise, we would be as rich as Satoshi Nakamoto), but I am curious to see how far sales
        will go on the primary and secondary markets.

      </p>

      <p>
        I would also like to thank Alex Tew, creator of "The Million Dollar Homepage", who inspired me for this
        application.

      </p>

      <p class="signature">
        Morphée213
      </p>

    </div>

  </div>
</template>

<style lang="scss" scoped >
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

p {
  margin: 1em;
}

.signature {
  text-align: right;
}
</style>
