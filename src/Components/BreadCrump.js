import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';

const Breadcrumb = ({ breadcrumbData = [] }) =>{
  const location = useLocation();
  const currentPath = location.pathname;

  const filteredBreadcrumbs = breadcrumbData.filter((item) => {
    return currentPath.startsWith(item.path);
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {filteredBreadcrumbs.map((item, index) => (
          <li key={index}>
            {index !== filteredBreadcrumbs.length - 1 ? (
              <>
                <Link to={item.path} className="text-gray-600 hover:text-gray-900">
                  {item.label}
                </Link>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </>
            ) : (
              <span className="text-gray-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;