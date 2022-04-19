import { Box, Container } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import Page from "../../pages/Page"
import { dashboardMenu, MenuLinkItem } from "./MenuItems"

export function DashboardMain() {
    return (

        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                overflow: 'auto',
            }}
        >
            <Container fixed maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Routes>
                    {dashboardMenu.map((item: MenuLinkItem) => {
                        return <Route key={item.route} path={item.route} element={(
                            <Page title={item.title}>
                                {item.component}
                            </Page>
                        )} />
                    })}
                </Routes>

            </Container>
        </Box>
    )
}