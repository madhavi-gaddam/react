import React from "react";

export function ProductsPage() {
  const [products, setProducts] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [cartItems, setCartItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage("Products could not be loaded.");
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const search = searchText.toLowerCase();

    return (
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  });

  function addToCart(product) {
    setCartItems((currentCartItems) => {
      const existingItem = currentCartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCartItems.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });
      }

      return [
        ...currentCartItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setCartItems((currentCartItems) => currentCartItems.filter((item) => item.id !== productId));
  }

  return (
    <section className="products-page">
      <div className="products-header">
        <div>
          <p className="products-kicker">Products</p>
          <h1>Product Catalog</h1>
        </div>

        <div className="products-actions">
          <span className="products-count">{filteredProducts.length} items</span>
          <span className="cart-button">
            Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
          </span>
        </div>
      </div>

      <label className="search-box products-search">
        <span>Search</span>
        <input
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search Products"
          type="search"
          value={searchText}
        />
      </label>

      {isLoading && <div className="products-state">Loading products...</div>}
      {errorMessage && <div className="products-state error">{errorMessage}</div>}

      {!isLoading && !errorMessage && (
        <div className={cartItems.length > 0 ? "products-layout cart-visible" : "products-layout"}>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img alt={product.title} className="product-image" src={product.thumbnail} />
                </div>

                <div className="product-info">
                  <div className="product-meta">
                    <span>{product.category}</span>
                    <span>Rating {product.rating}</span>
                  </div>

                  <h2>{product.title}</h2>
                  <p>{product.description}</p>

                  <div className="product-footer">
                    <strong>${product.price}</strong>
                    <span>{product.discountPercentage}% off</span>
                  </div>

                  <button className="add-cart-button" onClick={() => addToCart(product)} type="button">
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          {cartItems.length > 0 && (
            <aside className="cart-section">
              <h2>Cart Items</h2>

              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li className="cart-item" key={item.id}>
                    <img alt={item.title} className="cart-item-image" src={item.thumbnail} />

                    <div className="cart-item-info">
                      <span>{item.title}</span>
                      <strong>${item.price}</strong>
                      <p className="cart-quantity">Qty: {item.quantity}</p>
                      <button onClick={() => removeFromCart(item.id)} type="button">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      )}

      {!isLoading && !errorMessage && filteredProducts.length === 0 && (
        <div className="products-state">No products found</div>
      )}
    </section>
  );
}
