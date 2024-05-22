import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from 'antd';
import Navbar from '../Components/Navbar';

import { PropertiesPage } from '../Pages/properties/propertiesPage';
import { PropertyPage } from '../Pages/properties/propertyPage';

const layoutStyle = {
  minHeight: '100vh',
};

const contentStyle = {
  width: '80%',
  margin: 'auto',
};

const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={layoutStyle}>
        <Layout.Header>
          <Navbar />
        </Layout.Header>

        <Layout.Content style={contentStyle}>
          <Routes>
            {/* Properties */}
            <Route path="/" element={<Navigate to="/properties" replace />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:propertyId" element={<PropertyPage />} />

            {/* catch-all redirect to /properties */}
            <Route path="*" element={<Navigate to="/properties" />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
