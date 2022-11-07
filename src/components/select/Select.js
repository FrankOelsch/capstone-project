export default function Select({ onChange, onKeyDown, onClick, value }) {
  return (
    <div>
      <select onChange={onChange} onKeyDown={onKeyDown} value={value}>
        <option value={"Sectionaltor"}>Sectionaltor</option>
        <option value={"Rundlauftor"}>Rundlauftor</option>
      </select>
      <button onClick={onClick}>Ok</button>
    </div>
  );
}
