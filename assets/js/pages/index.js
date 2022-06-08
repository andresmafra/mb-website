let cachedResult = []

$('.js-range-slider').on('change', function () {
  simulate()
})

setInterval(() => {
  $('.js-slick-carousel').slick('refresh')
  load()
}, 7000)

function load() {
  $.ajax({
    url: `/brokers/realtime/quotation`,
    type: 'GET'
  }).then(result => {
    buildResult(result)
  }).fail(error => {
    console.log(error)
  })
}

function buildResult(result) {
  const html = []

  const itemsSorted = result.sort((a, b) => {
    return a.price > b.price ? 1 : -1
  })

  cachedResult = itemsSorted || []
  simulate()

  itemsSorted.forEach(item => {
    html.push(`
      <div class="col-sm-6 col-md-4 px-2 mb-3">
        <div class="card card-frame h-100">
          <a class="card-body" href="app-description.html">
            <div class="media align-items-center">
              <div class="u-sm-avatar mr-3">
                <img class="img-fluid" src="../../assets/cryptocurrency.png" alt="Image Description">
              </div>
              <div class="media-body">
                <div class="d-flex align-items-center">
                  <span class="d-block text-dark font-weight-medium">${item.provider}</span>
                </div>
                <small class="d-block text-secondary">${formatCurrency(item.price)}</small>
              </div>
            </div>
          </a>
        </div>
      </div>
      `)
  })
  $('.result').html(html.join(''))
}

function simulate() {
  if (cachedResult.length > 0) {
    const lowerPrice = cachedResult[0]
    const upperPrice = cachedResult[cachedResult.length - 1]
    const selectedInvested = parseFloat($('#invested').html())
    const investedBTCLower = selectedInvested / lowerPrice.price
    const investedBTCUpper = parseFloat(investedBTCLower * upperPrice.price).toFixed(2)

    console.log($('#invested').html())

    $('.invested-btc').html(investedBTCLower)

    $('.lower-price').html(formatCurrency(lowerPrice.price))
    $('.lower-price-c').html(lowerPrice.provider)
    $('.upper-price').html(formatCurrency(upperPrice.price))
    $('.upper-price-c').html(upperPrice.provider)

    $('.result-price').html(parseFloat(investedBTCUpper - selectedInvested).toFixed(2).replace('.', ','))
  }
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'USD',
  });
}

function formatDateWithHourAndSecond(date) {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}