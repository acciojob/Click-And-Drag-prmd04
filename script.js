document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let cubes = document.querySelectorAll('.cube');

    let activeCube = null;
    let initialX; // Mouse X position when drag starts
    let initialY; // Mouse Y position when drag starts
    let offsetX;  // Offset between mouse X and cube's left
    let offsetY;  // Offset between mouse Y and cube's top

    // Function to set initial positions for grid layout
    const setInitialCubePositions = () => {
        const containerRect = container.getBoundingClientRect();
        const containerLeft = containerRect.left;
        const containerTop = containerRect.top;

        // Reset display to grid to calculate positions correctly for initial setup
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(80px, 1fr))';
        container.style.gridTemplateRows = 'repeat(auto-fill, minmax(80px, 1fr))';
        container.style.gap = '10px';
        container.style.padding = '10px';


        cubes.forEach((cube, index) => {
            // Temporarily set position to static to get its natural grid position
            cube.style.position = 'static';
            const cubeRect = cube.getBoundingClientRect();
            const cubeLeft = cubeRect.left - containerLeft;
            const cubeTop = cubeRect.top - containerTop;

            // Now set to absolute and apply calculated initial position
            cube.style.position = 'absolute';
            cube.style.left = `${cubeLeft}px`;
            cube.style.top = `${cubeTop}px`;
        });

        // After setting initial absolute positions, remove grid properties from container
        // to prevent interference with absolute positioning during drag.
        container.style.display = 'block'; // Or 'relative' with block
        container.style.gridTemplateColumns = 'none';
        container.style.gridTemplateRows = 'none';
        container.style.gap = '0';
        container.style.padding = '0'; // If you want the padding to apply to absolute positioned cubes

    };

    // Call this once on load to arrange the cubes in a grid
    setInitialCubePositions();

    // Event listener for mousedown on the container (event delegation)
    container.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('cube')) {
            activeCube = e.target;
            activeCube.classList.add('dragging');

            const cubeRect = activeCube.getBoundingClientRect();
            initialX = e.clientX;
            initialY = e.clientY;

            // Calculate offset relative to the cube's top-left corner
            offsetX = e.clientX - cubeRect.left;
            offsetY = e.clientY - cubeRect.top;

            // Prevent default drag behavior (e.g., image dragging)
            e.preventDefault();
        }
    });

    // Event listener for mousemove on the document (important for smooth dragging outside the container)
    document.addEventListener('mousemove', (e) => {
        if (!activeCube) return;

        const containerRect = container.getBoundingClientRect();
        const containerLeft = containerRect.left;
        const containerTop = containerRect.top;
        const containerRight = containerRect.right;
        const containerBottom = containerRect.bottom;

        // Calculate the new position relative to the container's top-left
        let newX = e.clientX - containerLeft - offsetX;
        let newY = e.clientY - containerTop - offsetY;

        // Get cube dimensions
        const cubeWidth = activeCube.offsetWidth;
        const cubeHeight = activeCube.offsetHeight;

        // Apply boundary constraints
        // Left boundary
        if (newX < 0) {
            newX = 0;
        }
        // Top boundary
        if (newY < 0) {
            newY = 0;
        }
        // Right boundary
        if (newX + cubeWidth > containerRect.width) {
            newX = containerRect.width - cubeWidth;
        }
        // Bottom boundary
        if (newY + cubeHeight > containerRect.height) {
            newY = containerRect.height - cubeHeight;
        }

        activeCube.style.left = `${newX}px`;
        activeCube.style.top = `${newY}px`;
    });

    // Event listener for mouseup on the document
    document.addEventListener('mouseup', () => {
        if (activeCube) {
            activeCube.classList.remove('dragging');
            activeCube = null;
        }
    });

    // Optional: Re-calculate initial positions if window is resized (for responsive grid)
    window.addEventListener('resize', () => {
        setInitialCubePositions();
    });
});