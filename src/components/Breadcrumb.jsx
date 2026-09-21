import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  const location = useLocation();
  
  // If no items provided, generate from path
  const breadcrumbItems = items || generateBreadcrumbs(location.pathname);

  function generateBreadcrumbs(pathname) {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Bosh sahifa', path: '/', icon: Home }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Format segment name (capitalize first letter, replace hyphens with spaces)
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        path: currentPath,
        active: isLast
      });
    });

    return breadcrumbs;
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && <ChevronRight size={16} className="breadcrumb-separator" />}
          <div className={`breadcrumb-item ${item.active ? 'active' : ''}`}>
            {item.icon && <item.icon size={16} />}
            {item.active ? (
              <span>{item.label}</span>
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;