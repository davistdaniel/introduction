    function getRandomColor() {
      // Generate a random color in hexadecimal format
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function setRandomGradient() {
      var colors = [];
      for (var i = 0; i < 4; i++) {
        colors.push(getRandomColor());
      }
      var gradient = 'linear-gradient(-45deg, ' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', ' + colors[3] + ')';
      document.body.style.background = gradient;
    }

    // Call the function initially
    setRandomGradient();