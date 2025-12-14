import React from "react"
import styled from "styled-components"

const Visa = () => {
  return (
    <Container>
      <h1>Visa Info</h1>
      <br />
      <h2>Visa (Nepal)</h2>
      <p>
        All visitors except Indian nationals must hold a passport and valid visa
        in order to enter Nepal. Visas can be obtained at entry points into
        Nepal. In order to obtain a visa at the airport or any of the land entry
        points, you are required to complete an online visa form and provide a
        recent passport photograph and payment in cash.
      </p>
      <p> </p>
      <h2>Visa Charges</h2>
      <p>
        Gratis visa for 30 days available only for tourists of SAARC countries
      </p>
      <p>Multiple entry 15 days – US$ 30 or equivalent convertible currency</p>
      <p>Multiple entry 30 days – US$ 50 or equivalent convertible currency</p>
      <p>Multiple entry 90 days – US$ 125 or equivalent convertible currency</p>
      <p> </p>
      <h2>Visa Extension</h2>
      <p>
        If you wish to extend your visa, you can do this at the Department of
        Immigration in Kathmandu.
      </p>
      <p>
        The visa extension fee for 15 days or less is US$ 45 or equivalent
        convertible currency.
      </p>
      <p>
        The visa extension fee for more than 15 days is US$ 3 per day Tourist
        visa can be issued for maximum period of 150 days in a single visa year
        (January to December).
      </p>
      <p>
        In the case of delay less than 150 days additional US$ 5 per day as late
        fine.
      </p>
      <p> </p>
      <h2>Gratis Visa (Visa for Free)</h2>
      <p>
        Gratis Visa is issued free of cost in case of following categories of
        Visa applicants:
      </p>
      <p>1. Children below 10 years</p>
      <p>
        2. Up to 30 days for SAARC Citizen (except Afghanistan) visiting Nepal
        for the first time in a given visa Year. Afghan citizen are eligible for
        Gratis Visa on Arrival only upon the recommendation of Department of
        Immigration. If you are an Afghan citizen, you can request concerned
        institution inviting you to Nepal for necessary paperwork with
        Department of Immigration to get you Gratis Visa 'On Arrival'.
      </p>
      <p>
        3. Non-Residential Nepalese (NRN) card holder (issued by MoFA /Nepalese
        diplomatic missions abroad)
      </p>
      <p>4. Chinese Nationals</p>
      <br />
      <p>
        Officials from China, Brazil, Russia and Thailand do not need Entry Visa
        based on reciprocal visa waiver Agreement
      </p>
      <p>
        Visas of all kinds including ‘Gratis’ issued at the Airport are Tourist
        Visas. Contact Department of Immigration for extending your visa or
        changing the category of your visa. Tourist Visa extension can be done
        from Immigration Office, Pokhara too. Non tourist visa extension can be
        done only at Department of Immigration (if eligible) for a period of
        maximum one year (except business visa).
      </p>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 5vw;
  font-size: 2rem;
  color: #707070;
  margin-bottom: 4rem;
`

export default Visa
