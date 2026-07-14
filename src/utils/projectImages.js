import { imagePath } from './imageUtils';

// Dynamically load project images from the projects directory
export const loadProjectImages = async (projectId) => {
  const projectDirs = {
    1: 'tanglin',
    2: 'forge',
    3: 'helix',
    4: 'katong',
  };

  const projectDir = projectDirs[projectId];
  if (!projectDir) return [];

  const images = [];

  // Load main image
  try {
    images.push({
      src: imagePath(`/images/projects/${projectDir}/project-${projectDir}.webp`),
      alt: 'Main',
      index: 0,
    });
  } catch (e) {
    // Main image not found
  }

  // Load secondary images (project-{name}-2.webp, project-{name}-3.webp, etc.)
  for (let i = 2; i <= 5; i++) {
    try {
      const img = new Image();
      img.src = imagePath(`/images/projects/${projectDir}/secondary/project-${projectDir}-${i}.webp`);
      // If image loads successfully, add it
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      images.push({
        src: imagePath(`/images/projects/${projectDir}/secondary/project-${projectDir}-${i}.webp`),
        alt: `Image ${i}`,
        index: images.length,
      });
    } catch (e) {
      // Image not found, continue
    }
  }

  return images;
};
