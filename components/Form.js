import { useOvermind } from "../overmind";
import ImageInputs from "./ImageInputs";
import Palettes from "./Palettes";

const Form = ({ imageEl, canvas }) => {
  const { state, actions } = useOvermind();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        actions.getAndPixelateImage({ imageEl, canvas });
      }}
    >
      <div className="nes-field mb-3">
        <nav className="mb-3">
          {state.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => actions.setTab(tab)}
              className={`nes-btn ${
                state.activeTab === tab ? "is-primary" : null
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <ImageInputs />
      </div>
      <div className="nes-field mb-3">
        <label htmlFor="size_field">Pixel Size</label>
        <input
          type="text"
          id="size_field"
          className="nes-input"
          value={state.scale}
          onChange={(e) => state.setScale(e.target.value)}
        />
      </div>
      <label className="mb-3">
        <input
          type="checkbox"
          className="nes-checkbox"
          checked={state.grayscale}
          onChange={() => actions.toggleGrayscale()}
        />
        <span>Grayscale</span>
      </label>

      <div className="mb-6">
        <Palettes
          activePalette={state.palette}
          onChange={(value) => actions.setPalette(value)}
        />
      </div>
      <button
        type="submit"
        className={`nes-btn ${
          state.isButtonDisabled ? "is-disabled" : "is-primary"
        }`}
        disabled={state.isButtonDisabled}
      >
        Pixel It
      </button>
    </form>
  );
};

export default Form;