const Section = ({content, image, title}) => (
  <>
    {title ? title : null}
    {image ? <img src={image} alt={title?.innerText} className="my-4" /> : null}
    {content ? content : null}
  </>
);

export default Section;
