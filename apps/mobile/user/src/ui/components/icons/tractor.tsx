import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
export const Tractor = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill="#57C555" clipPath="url(#a)">
      <Path d="M48.495 24.064c2.438 0 4.666.734 6.553 1.992V13.578c0-2.883-2.359-5.242-5.242-5.242H33.317L30.54 5.557l3.696-3.696L32.374 0 23.12 9.253l1.861 1.861 3.697-3.696 2.778 2.779V16.2c0 2.883-2.359 5.242-5.242 5.242h-1.416c2.49 2.78 4.037 6.449 4.037 10.486 0 .891-.105 1.756-.236 2.621h8.23c.656-5.898 5.61-10.485 11.666-10.485Z" />
      <Path d="M48.495 26.685c-5.06 0-9.175 4.116-9.175 9.175 0 5.059 4.116 9.175 9.175 9.175 5.059 0 9.175-4.116 9.175-9.175 0-5.06-4.116-9.175-9.175-9.175Zm0 13.107a3.927 3.927 0 0 1-3.932-3.932 3.927 3.927 0 0 1 3.932-3.932 3.927 3.927 0 0 1 3.932 3.932 3.927 3.927 0 0 1-3.932 3.932ZM7.864 16.2h13.107c0-2.884-2.36-5.243-5.243-5.243H7.864a2.629 2.629 0 0 0-2.621 2.621A2.63 2.63 0 0 0 7.864 16.2ZM23.146 28.835l-.471-1.232 2.437-.918c-1.205-2.778-3.355-5.007-6.055-6.37l-1.048 2.333-1.206-.55 1.048-2.36a12.85 12.85 0 0 0-4.744-.917c-1.39 0-2.726.288-3.985.682l.892 2.385-1.233.472-.917-2.438c-2.779 1.206-5.007 3.355-6.37 6.055l2.333 1.049-.55 1.206-2.36-1.049A12.85 12.85 0 0 0 0 31.928c0 1.39.288 2.726.682 3.984l2.385-.891.472 1.232-2.438.917c1.206 2.78 3.355 5.007 6.055 6.37l1.049-2.333 1.206.55-1.049 2.36a12.85 12.85 0 0 0 4.745.918c1.389 0 2.726-.289 3.984-.682l-.891-2.386 1.232-.471.917 2.438c2.779-1.206 5.007-3.356 6.37-6.056l-2.333-1.048.55-1.206 2.36 1.048a12.85 12.85 0 0 0 .917-4.744c0-1.39-.288-2.726-.681-3.985l-2.386.892Zm-7.025 10.354c-4.01 1.651-8.624-.236-10.275-4.247-1.652-4.01.236-8.624 4.246-10.275 4.01-1.652 8.624.236 10.276 4.246 1.677 4.01-.236 8.625-4.247 10.276Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h58v46H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
