    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var particles = [];
    var numParticles = 75;
    var lines = true;
    var lineWidth = 0.5;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle object
    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.directionX = Math.random() * 2 - 1;
      this.directionY = Math.random() * 2 - 1;

      // Draw particle
      this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        context.fill();
      };

      // Update particle's position
      this.update = function() {
        this.x += this.directionX;
        this.y += this.directionY;

        // Bounce off the edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.directionY = -this.directionY;
        }

        // Draw particle
        this.draw();
      };
    }

    // Create particles
    function createParticles() {
      particles = [];
      for (var i = 0; i < numParticles; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    }

    // Clear canvas
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Draw lines between particles
    function drawLines() {
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = 'rgba(0, 0, 0, ' + (1 - distance / 100) + ')';
            context.lineWidth = lineWidth;
            context.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      clearCanvas();

      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      if (lines) {
        drawLines();
      }

      requestAnimationFrame(animate);
    }

    // Initialize
    createParticles();
    animate();

    // Resize canvas when window size changes
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    });

