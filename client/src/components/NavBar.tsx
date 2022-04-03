
import React, { useEffect, useState } from 'react'
import { Navbar,Container,Offcanvas,Nav,NavDropdown,Form,Button,FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const NavBar = (props:any) => {
    const [visible, setVisible] = useState(true)
    const navHome = useNavigate()
    const positions = [{'Телефоны':'phone'}, {'Ноутбуки':'laptope'}]
    const [search, setSearch] = useState("")
    const [positionsSearch, setPositionSearch] = useState<any>([])
    useEffect(() => {
        setPositionSearch(positions.filter((elem:any)=>
        (Object.keys(elem)[0].toLowerCase()).includes(search.toLowerCase())
    ))
    }, [search])
    
    
  return (
      visible ? 
        <Navbar collapseOnSelect  variant="dark"   expand={false}>
        <Container fluid>
        <Navbar.Toggle   className='main_nav_button' aria-controls="offcanvasNavbar" />
          <Navbar.Brand className='main_logo_div'  href="/">Web Liter.ru</Navbar.Brand>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            collapseOnSelect
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title style={{color: "black"}} id="offcanvasNavbarLabel">Web Liter.ru</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
              <Nav className="justify-content-end flex-grow-1 pe-3">
                  {positionsSearch.length >= 1 ? positionsSearch.map((elem:any, index:any)=><Nav.Link data-bs-dismiss="offcanvas" key={index} href="#"  style={{color: "black"}}  onClick={()=>{
                      props.setTypeGoods(Object.values(elem)[0]) 
                navHome("/")}}>{ Object.keys(elem)[0]} </Nav.Link>):positions.map((elem:any, index:any)=><Nav.Link key={index} href="#"  style={{color: "black"}}   onClick={()=>{
                  props.setTypeGoods(Object.values(elem)[0]) 
            navHome("/")}}>{ Object.keys(elem)[0]} </Nav.Link>)}
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Поиск"
                  className="me-2"
                  aria-label="Search"
                  onChange={(event:any)=>{
                      setSearch(event.target.value)
                  }}
                />
                <Button onClick={()=> setPositionSearch(positions.filter((elem:any)=>
              (Object.keys(elem)[0].toLowerCase()).includes(search.toLowerCase())
          ))} variant="outline-success">Поиск</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    :<></>
   
  )
}
