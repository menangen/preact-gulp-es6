/**
 * Created by menangen on 22.05.17.
 */
import handlers from "./handlers"

document.addEventListener("DOMContentLoaded", handlers.loadComplete);
document.addEventListener("mousemove", handlers.moveHandler);