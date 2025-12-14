import styled from "styled-components"

const PageLoading = () => (
  <PageLoadingContainer>Loading...</PageLoadingContainer>
)

const PageLoadingContainer = styled.div`
  font-size: 10rem;
  width: 100vh;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default PageLoading
