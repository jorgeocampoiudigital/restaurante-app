// Datos iniciales
const initialRestaurants = [
  {
    name: "La Parrilla del Chef",
    description: "Carnes a la parrilla y platos tradicionales colombianos.",
    address: "Calle 10 # 20-30, Medellín",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    name: "Sushi Palace",
    description: "Auténtica cocina japonesa con ingredientes frescos.",
    address: "Carrera 40 # 25-60, Medellín",
    image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    name: "Pizzeria Napoli",
    description: "Pizzas al horno de leña con recetas tradicionales italianas.",
    address: "Calle 50 # 30-15, Medellín",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=781&q=80"
  }
];

// Función para obtener todos los restaurantes (de localStorage o iniciales)
function getRestaurants() {
  const stored = localStorage.getItem('restaurants');
  return stored ? JSON.parse(stored) : [...initialRestaurants];
}

// Función para guardar restaurantes
function saveRestaurants(restaurantsArray) {
  localStorage.setItem('restaurants', JSON.stringify(restaurantsArray));
}

// Función para renderizar restaurantes
function renderRestaurants(restaurantsArray, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  if (restaurantsArray.length === 0) {
    container.innerHTML = '<div class="col-12 text-center"><p>No se encontraron restaurantes.</p></div>';
    return;
  }
  
  restaurantsArray.forEach(restaurant => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
      <div class="card restaurant-card h-100">
        <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${restaurant.name}</h5>
          <p class="card-text">${restaurant.description}</p>
          <p class="card-text"><small class="text-muted">${restaurant.address}</small></p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Página de inicio
if (document.getElementById('restaurants-list')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderRestaurants(getRestaurants(), 'restaurants-list');
  });
}

// Página de búsqueda
if (document.getElementById('search-btn')) {
  document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const allRestaurants = getRestaurants();
      
      const filtered = allRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.description.toLowerCase().includes(searchTerm) ||
        restaurant.address.toLowerCase().includes(searchTerm)
      );
      
      renderRestaurants(filtered, 'search-results');
    };
    
    // Búsqueda al hacer click
    searchBtn.addEventListener('click', performSearch);
    
    // Búsqueda al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
    
    // Mostrar todos los restaurantes inicialmente
    renderRestaurants(getRestaurants(), 'search-results');
  });
}

// Página de nuevo restaurante
if (document.getElementById('new-restaurant-form')) {
  document.getElementById('new-restaurant-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const address = document.getElementById('address').value.trim();
    const image = document.getElementById('image').value.trim();
    
    if (!name || !description || !address || !image) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    const allRestaurants = getRestaurants();
    
    // Verificar si el restaurante ya existe
    if (allRestaurants.some(r => r.name.toLowerCase() === name.toLowerCase())) {
      alert('Ya existe un restaurante con ese nombre');
      return;
    }
    
    // Agregar nuevo restaurante
    allRestaurants.push({ name, description, address, image });
    saveRestaurants(allRestaurants);
    
    alert(`Restaurante "${name}" creado exitosamente!`);
    document.getElementById('new-restaurant-form').reset();  
  });
}