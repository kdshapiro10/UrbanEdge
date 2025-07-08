document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('open');
  });
  
  document.getElementById('close-menu').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('open');
  });
  
  document.getElementById('chat-now').addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof Tawk_API !== 'undefined') {
      Tawk_API.maximize();
    }
  });
  
  document.getElementById('mobile-chat-now').addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof Tawk_API !== 'undefined') {
      Tawk_API.maximize();
    }
  });
  