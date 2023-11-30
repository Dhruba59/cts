import { SVGAttributes } from "react";

export const DownArrowIcon = ({ width = "15", height = "9", fill = 'black', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 15 9" fill={fill} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7071 0.292893C14.3166 -0.0976312 13.6834 -0.0976313 13.2929 0.292893L7.5 6.08578L1.70711 0.292891C1.31658 -0.0976335 0.683417 -0.0976336 0.292893 0.292891C-0.0976316 0.683415 -0.0976317 1.31658 0.292893 1.7071L6.08578 7.5C6.86683 8.28105 8.13316 8.28105 8.91421 7.5L14.7071 1.70711C15.0976 1.31658 15.0976 0.683418 14.7071 0.292893Z" fill={fill} />
  </svg>
)

export const SettingsIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.2"></circle> <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" stroke-width="1.2"></path> </g></svg>
)

export const SidebarToggleIcon = ({ width = "20", height = "17", fill = '262626', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="20" height="17" viewBox="0 0 20 17" fill={fill} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M0 0.5H20V2.5H0V0.5ZM0 6.07L3.887 8.5L0 10.93V6.07ZM5 7.5H20V9.5H5V7.5ZM0 14.5H20V16.5H0V14.5Z" fill={fill} />
  </svg>
)

export const SidebarMinimizeIcon = ({ width = "28", height = "28", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <rect width="28" height="28" rx="8" fill="white" />
    <path d="M11.8044 11.1381C12.0648 10.8777 12.0648 10.4556 11.8044 10.1953C11.5441 9.93491 11.122 9.93491 10.8616 10.1953L7.52827 13.5286C7.26792 13.7889 7.26792 14.2111 7.52827 14.4714L10.8616 17.8047C11.122 18.0651 11.5441 18.0651 11.8044 17.8047C12.0648 17.5444 12.0648 17.1223 11.8044 16.8619L8.94248 14L11.8044 11.1381Z" fill="black" />
    <path d="M17.1377 10.1953C16.8774 9.93491 16.4553 9.93491 16.1949 10.1953C15.9346 10.4556 15.9346 10.8777 16.1949 11.1381L19.0569 14L16.1949 16.8619C15.9346 17.1223 15.9346 17.5444 16.1949 17.8047C16.4553 18.0651 16.8774 18.0651 17.1377 17.8047L20.4711 14.4714C20.7314 14.2111 20.7314 13.7889 20.4711 13.5286L17.1377 10.1953Z" fill="black" />
    <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="black" stroke-opacity="0.15" />
  </svg>
)

export const SidebarExpandIcon = ({ width = "28", height = "28", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={width} viewBox="0 0 28 28" fill={fill} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <rect width="28" height="28" rx="8" fill="white" />
    <path d="M9.33464 17.3332L12.668 13.9998L9.33464 10.6665" stroke="#262626" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.6673 10.6668L15.334 14.0002L18.6673 17.3335" stroke="#262626" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="black" stroke-opacity="0.15" />
  </svg>
)


// export const IndicationIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M17.9667 8.9499L16.8417 7.63324C16.6334 7.38324 16.4584 6.91657 16.4584 6.58324V5.16657C16.4584 4.28324 15.7334 3.55824 14.8501 3.55824H13.4334C13.1001 3.55824 12.6251 3.38324 12.3751 3.1749L11.0584 2.0499C10.4834 1.55824 9.54173 1.55824 8.96673 2.0499L7.6334 3.1749C7.3834 3.38324 6.91673 3.55824 6.5834 3.55824H5.14173C4.2584 3.55824 3.5334 4.28324 3.5334 5.16657V6.58324C3.5334 6.90824 3.36673 7.3749 3.1584 7.6249L2.0334 8.9499C1.55007 9.53324 1.55007 10.4666 2.0334 11.0332L3.1584 12.3582C3.36673 12.5999 3.5334 13.0749 3.5334 13.3999V14.8249C3.5334 15.7082 4.2584 16.4332 5.14173 16.4332H6.59173C6.91673 16.4332 7.39173 16.6082 7.64173 16.8166L8.9584 17.9416C9.5334 18.4332 10.4751 18.4332 11.0501 17.9416L12.3667 16.8166C12.6167 16.6082 13.0834 16.4332 13.4167 16.4332H14.8334C15.7167 16.4332 16.4417 15.7082 16.4417 14.8249V13.4082C16.4417 13.0749 16.6167 12.6082 16.8251 12.3582L17.9501 11.0416C18.4584 10.4749 18.4584 9.53324 17.9667 8.9499ZM9.37506 6.7749C9.37506 6.43324 9.6584 6.1499 10.0001 6.1499C10.3417 6.1499 10.6251 6.43324 10.6251 6.7749V10.7999C10.6251 11.1416 10.3417 11.4249 10.0001 11.4249C9.6584 11.4249 9.37506 11.1416 9.37506 10.7999V6.7749ZM10.0001 14.0582C9.54173 14.0582 9.16673 13.6832 9.16673 13.2249C9.16673 12.7666 9.5334 12.3916 10.0001 12.3916C10.4584 12.3916 10.8334 12.7666 10.8334 13.2249C10.8334 13.6832 10.4667 14.0582 10.0001 14.0582Z" fill="#EC1C24" />
//   </svg>
// )

export const MagicStarIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.4082 3.44987L14.3499 6.60821C14.3416 7.04154 14.6166 7.61654 14.9666 7.87487L17.0332 9.44154C18.3582 10.4415 18.1416 11.6665 16.5582 12.1665L13.8666 13.0082C13.4166 13.1499 12.9416 13.6415 12.8249 14.0999L12.1832 16.5499C11.6749 18.4832 10.4082 18.6749 9.35823 16.9749L7.89157 14.5999C7.6249 14.1665 6.99157 13.8415 6.49157 13.8665L3.70823 14.0082C1.71657 14.1082 1.1499 12.9582 2.4499 11.4415L4.0999 9.52487C4.40823 9.16654 4.5499 8.49987 4.40823 8.04987L3.55823 5.34987C3.06657 3.76654 3.9499 2.89154 5.5249 3.40821L7.98323 4.21654C8.3999 4.34987 9.0249 4.25821 9.3749 3.99987L11.9416 2.14987C13.3332 1.15821 14.4416 1.74154 14.4082 3.44987Z" fill="#5C5E64" />
    <path d="M17.8669 17.0583L15.3419 14.5333C15.1003 14.2916 14.7003 14.2916 14.4586 14.5333C14.2169 14.775 14.2169 15.175 14.4586 15.4166L16.9836 17.9416C17.1086 18.0666 17.2669 18.125 17.4253 18.125C17.5836 18.125 17.7419 18.0666 17.8669 17.9416C18.1086 17.7 18.1086 17.3 17.8669 17.0583Z" fill="#5C5E64" />
  </svg>
)

export const GlobalEditIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_268_13188)">
      <path d="M15.6084 12.2252L12.15 15.6836C12.0167 15.8169 11.8917 16.0752 11.8584 16.2586L11.6667 17.5836C11.6 18.0586 11.9334 18.4002 12.4084 18.3252L13.7334 18.1336C13.9167 18.1086 14.175 17.9752 14.3084 17.8419L17.7667 14.3836C18.3584 13.7919 18.6417 13.0919 17.7667 12.2169C16.9 11.3502 16.2084 11.6252 15.6084 12.2252Z" fill="#5C5E64" />
      <path d="M15.1162 12.7168C15.4079 13.7668 16.2329 14.5835 17.2829 14.8835L15.1162 12.7168Z" fill="#5C5E64" />
      <path d="M1.69147 12.1919C1.69147 12.2169 1.6748 12.2502 1.6748 12.2752C2.44147 13.8086 3.69147 15.0669 5.2248 15.8252C5.2498 15.8252 5.28314 15.8086 5.30814 15.8086C5.0248 14.8419 4.80814 13.8502 4.6498 12.8586C3.6498 12.6919 2.65814 12.4752 1.69147 12.1919Z" fill="#5C5E64" />
      <path d="M15.8921 5.35837C15.1087 3.7167 13.7837 2.3917 12.1504 1.6167C12.4504 2.60837 12.7004 3.62503 12.8671 4.6417C13.8837 4.80837 14.9004 5.05003 15.8921 5.35837Z" fill="#5C5E64" />
      <path d="M1.6084 5.35811C2.6084 5.05811 3.62507 4.80811 4.64173 4.64144C4.8084 3.64977 5.01673 2.66644 5.30007 1.69977C5.27507 1.69977 5.24173 1.68311 5.21673 1.68311C3.65007 2.45811 2.37507 3.76644 1.6084 5.35811Z" fill="#5C5E64" />
      <path d="M11.5167 4.46683C11.3167 3.3835 11.0667 2.30016 10.7084 1.25016C10.6917 1.19183 10.6917 1.14183 10.6834 1.07516C10.0667 0.925163 9.41673 0.833496 8.75007 0.833496C8.07507 0.833496 7.4334 0.925163 6.8084 1.0835C6.80007 1.14183 6.8084 1.19183 6.79173 1.2585C6.44173 2.3085 6.1834 3.3835 5.9834 4.46683C7.82507 4.26683 9.67507 4.26683 11.5167 4.46683Z" fill="#5C5E64" />
      <path d="M4.46634 5.9834C3.37467 6.1834 2.30801 6.44173 1.24967 6.79173C1.19134 6.8084 1.14134 6.8084 1.08301 6.81673C0.924674 7.4334 0.833008 8.0834 0.833008 8.75007C0.833008 9.42507 0.924674 10.0667 1.08301 10.6917C1.14134 10.7001 1.19134 10.6917 1.25801 10.7084C2.30801 11.0584 3.38301 11.3167 4.47467 11.5167C4.26634 9.67507 4.26634 7.82507 4.46634 5.9834Z" fill="#5C5E64" />
      <path d="M16.4171 6.81673C16.3587 6.81673 16.3087 6.8084 16.2421 6.79173C15.1921 6.44173 14.1087 6.1834 13.0254 5.9834C13.2337 7.82507 13.2337 9.67507 13.0254 11.5084C14.1087 11.3084 15.1921 11.0584 16.2421 10.7001C16.3004 10.6834 16.3504 10.6917 16.4171 10.6834C16.5671 10.0584 16.6671 9.41673 16.6671 8.74173C16.6671 8.0834 16.5754 7.44173 16.4171 6.81673Z" fill="#5C5E64" />
      <path d="M5.9834 13.0332C6.1834 14.1249 6.4334 15.1999 6.79173 16.2499C6.8084 16.3082 6.80007 16.3582 6.8084 16.4249C7.4334 16.5749 8.07507 16.6666 8.75007 16.6666C9.41673 16.6666 10.0667 16.5749 10.6834 16.4166C10.6917 16.3582 10.6917 16.3082 10.7084 16.2416C11.0584 15.1916 11.3167 14.1166 11.5167 13.0249C10.6001 13.1249 9.67507 13.1999 8.75007 13.1999C7.82507 13.1999 6.90007 13.1332 5.9834 13.0332Z" fill="#5C5E64" />
      <path d="M5.79199 5.7915C5.54199 7.75817 5.54199 9.7415 5.79199 11.7165C7.75866 11.9665 9.74199 11.9665 11.717 11.7165C11.967 9.74984 11.967 7.7665 11.717 5.7915C9.74199 5.5415 7.75866 5.5415 5.79199 5.7915Z" fill="#5C5E64" />
    </g>
    <defs>
      <clipPath id="clip0_268_13188">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)


export const BookIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M9.37533 5.00023V16.5919C9.37533 17.1836 8.77533 17.5919 8.23366 17.3669C6.68366 16.7169 4.75866 16.1502 3.39199 15.9669L3.13366 15.9336C2.32533 15.8336 1.66699 15.0919 1.66699 14.2836V4.37523C1.66699 3.37523 2.47533 2.56689 3.47533 2.56689H3.53366C5.10033 2.70023 7.40866 3.43356 8.93366 4.25856C9.20866 4.40856 9.37533 4.68356 9.37533 5.00023Z" fill="#5C5E64" />
    <path d="M16.525 2.56689H16.475C16.275 2.58356 16.0583 2.60856 15.8333 2.65023C14.8083 2.81689 13.5917 3.16689 12.5 3.60023C11.9833 3.80856 11.5 4.03356 11.075 4.25856C10.8 4.40856 10.625 4.69189 10.625 5.00023V16.5919C10.625 17.1836 11.225 17.5919 11.7667 17.3669C13.3167 16.7169 15.2417 16.1502 16.6083 15.9669L16.8667 15.9336C17.675 15.8336 18.3333 15.0919 18.3333 14.2836V4.37523C18.3333 3.37523 17.525 2.56689 16.525 2.56689ZM16.0583 11.4419C16.0583 11.7669 15.825 11.9086 15.5417 11.7502L14.6583 11.2586C14.5667 11.2086 14.4167 11.2086 14.3167 11.2586L13.4333 11.7502C13.15 11.9086 12.9167 11.7669 12.9167 11.4419V8.88356C12.9167 8.50023 13.2333 8.18356 13.6167 8.18356H15.3667C15.75 8.18356 16.0667 8.50023 16.0667 8.88356V11.4419H16.0583Z" fill="#5C5E64" />
  </svg>
)

export const PersonalCardIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0003 2.5H5.00033C3.15866 2.5 1.66699 3.98333 1.66699 5.80833V14.1917C1.66699 16.0167 3.15866 17.5 5.00033 17.5H15.0003C16.842 17.5 18.3337 16.0167 18.3337 14.1917V5.80833C18.3337 3.98333 16.842 2.5 15.0003 2.5ZM7.08366 5.975C8.14199 5.975 9.00866 6.84167 9.00866 7.9C9.00866 8.95833 8.14199 9.825 7.08366 9.825C6.02533 9.825 5.15866 8.95833 5.15866 7.9C5.15866 6.84167 6.02533 5.975 7.08366 5.975ZM10.3087 13.8833C10.2337 13.9667 10.117 14.0167 10.0003 14.0167H4.16699C4.05033 14.0167 3.93366 13.9667 3.85866 13.8833C3.78366 13.8 3.74199 13.6833 3.75033 13.5667C3.89199 12.1667 5.00866 11.0583 6.40866 10.925C6.85033 10.8833 7.30866 10.8833 7.75033 10.925C9.15033 11.0583 10.2753 12.1667 10.4087 13.5667C10.4253 13.6833 10.3837 13.8 10.3087 13.8833ZM15.8337 13.9583H14.167C13.8253 13.9583 13.542 13.675 13.542 13.3333C13.542 12.9917 13.8253 12.7083 14.167 12.7083H15.8337C16.1753 12.7083 16.4587 12.9917 16.4587 13.3333C16.4587 13.675 16.1753 13.9583 15.8337 13.9583ZM15.8337 10.625H12.5003C12.1587 10.625 11.8753 10.3417 11.8753 10C11.8753 9.65833 12.1587 9.375 12.5003 9.375H15.8337C16.1753 9.375 16.4587 9.65833 16.4587 10C16.4587 10.3417 16.1753 10.625 15.8337 10.625ZM15.8337 7.29167H11.667C11.3253 7.29167 11.042 7.00833 11.042 6.66667C11.042 6.325 11.3253 6.04167 11.667 6.04167H15.8337C16.1753 6.04167 16.4587 6.325 16.4587 6.66667C16.4587 7.00833 16.1753 7.29167 15.8337 7.29167Z" fill="#5C5E64" />
  </svg>
)

export const LightModeIcon = ({ width = "16", height = "16", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...rest}
  >
    <circle fill="black" cx="12" cy="12" r="5" />
    <g stroke="currentColor">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
)

export const DarkModeIcon = ({ width = "16", height = "16", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    style={{ transform: "rotate(40deg)" }}
    {...rest}
  >
    <mask id="mask">
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      <circle cx="12" cy="4" r="9" fill="black" />
    </mask>
    <circle fill="black" cx="12" cy="12" r="9" mask="url(#mask)" />
    {/* <g stroke="currentColor">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g> */}
  </svg>
);

export const ArrowSwapHorizontal = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill={fill} xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M13.492 1.6665H6.50866C3.47533 1.6665 1.66699 3.47484 1.66699 6.50817V13.4832C1.66699 16.5248 3.47533 18.3332 6.50866 18.3332H13.4837C16.517 18.3332 18.3253 16.5248 18.3253 13.4915V6.50817C18.3337 3.47484 16.5253 1.6665 13.492 1.6665ZM14.742 11.7082C14.7087 11.7832 14.667 11.8498 14.6087 11.9082L12.1503 14.3665C12.0253 14.4915 11.867 14.5498 11.7087 14.5498C11.5503 14.5498 11.392 14.4915 11.267 14.3665C11.0253 14.1248 11.0253 13.7248 11.267 13.4832L12.6587 12.0915H5.83366C5.49199 12.0915 5.20866 11.8082 5.20866 11.4665C5.20866 11.1248 5.49199 10.8415 5.83366 10.8415H14.167C14.2503 10.8415 14.3253 10.8582 14.4087 10.8915C14.5587 10.9582 14.6837 11.0748 14.7503 11.2332C14.8087 11.3832 14.8087 11.5498 14.742 11.7082ZM14.167 9.15817H5.83366C5.75033 9.15817 5.67533 9.1415 5.59199 9.10817C5.44199 9.0415 5.31699 8.92484 5.25033 8.7665C5.18366 8.6165 5.18366 8.4415 5.25033 8.2915C5.29199 8.2165 5.33366 8.14984 5.39199 8.0915L7.85033 5.63317C8.09199 5.3915 8.49199 5.3915 8.73366 5.63317C8.97533 5.87484 8.97533 6.27484 8.73366 6.5165L7.34199 7.90817H14.167C14.5087 7.90817 14.792 8.1915 14.792 8.53317C14.792 8.87484 14.5087 9.15817 14.167 9.15817Z" fill="#5C5E64" />
  </svg>
);

export const SettingsIcon2 = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.492 1.6665H6.50866C3.47533 1.6665 1.66699 3.47484 1.66699 6.50817V13.4832C1.66699 16.5248 3.47533 18.3332 6.50866 18.3332H13.4837C16.517 18.3332 18.3253 16.5248 18.3253 13.4915V6.50817C18.3337 3.47484 16.5253 1.6665 13.492 1.6665ZM6.39199 4.58317C6.39199 4.2415 6.67533 3.95817 7.01699 3.95817C7.35866 3.95817 7.64199 4.2415 7.64199 4.58317V7.83317C7.64199 8.17484 7.35866 8.45817 7.01699 8.45817C6.67533 8.45817 6.39199 8.17484 6.39199 7.83317V4.58317ZM7.99288 13.6664C7.79197 13.7622 7.64199 13.953 7.64199 14.1756V15.4165C7.64199 15.7582 7.35866 16.0415 7.01699 16.0415C6.67533 16.0415 6.39199 15.7582 6.39199 15.4165V14.1756C6.39199 13.953 6.24198 13.7623 6.04117 13.6662C5.27643 13.3005 4.75033 12.526 4.75033 11.6248C4.75033 10.3748 5.76699 9.34984 7.01699 9.34984C8.26699 9.34984 9.29199 10.3665 9.29199 11.6248C9.29199 12.5262 8.75941 13.3007 7.99288 13.6664ZM13.6087 15.4165C13.6087 15.7582 13.3253 16.0415 12.9837 16.0415C12.642 16.0415 12.3587 15.7582 12.3587 15.4165V12.1665C12.3587 11.8248 12.642 11.5415 12.9837 11.5415C13.3253 11.5415 13.6087 11.8248 13.6087 12.1665V15.4165ZM12.9837 10.6415C11.7337 10.6415 10.7087 9.62484 10.7087 8.3665C10.7087 7.46517 11.2412 6.69064 12.0078 6.32497C12.2087 6.22913 12.3587 6.03831 12.3587 5.81571V4.58317C12.3587 4.2415 12.642 3.95817 12.9837 3.95817C13.3253 3.95817 13.6087 4.2415 13.6087 4.58317V5.82405C13.6087 6.04664 13.7587 6.23741 13.9595 6.33345C14.7242 6.69918 15.2503 7.47363 15.2503 8.37484C15.2503 9.62484 14.2337 10.6415 12.9837 10.6415Z" fill="#5C5E64" />
  </svg>
);

export const CloseIcon = ({ width = "16", height = "16", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={fill}
    {...rest}
    className="cursor-pointer"
  >
    <path
      d="M8.92473 7.99916L13.6122 2.41166C13.6908 2.31881 13.6247 2.17773 13.5033 2.17773H12.0783C11.9944 2.17773 11.914 2.21523 11.8587 2.27952L7.99258 6.88845L4.12651 2.27952C4.07294 2.21523 3.99258 2.17773 3.90687 2.17773H2.48187C2.36044 2.17773 2.29437 2.31881 2.37294 2.41166L7.06044 7.99916L2.37294 13.5867C2.35534 13.6074 2.34405 13.6327 2.3404 13.6596C2.33676 13.6865 2.34092 13.7139 2.35239 13.7386C2.36386 13.7632 2.38216 13.784 2.40511 13.7985C2.42806 13.8131 2.4547 13.8207 2.48187 13.8206H3.90687C3.9908 13.8206 4.07115 13.7831 4.12651 13.7188L7.99258 9.10988L11.8587 13.7188C11.9122 13.7831 11.9926 13.8206 12.0783 13.8206H13.5033C13.6247 13.8206 13.6908 13.6795 13.6122 13.5867L8.92473 7.99916Z"
      fill="black"
      fillOpacity="0.45"
    />
  </svg>
);


export const RightArrowIcon = ({ width = "16", height = "16", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="arrow"{...rest}>
    <g transform="translate(28 328)">
      <path fill="#134563" d="M4-272.1c-13.2 0-23.9-10.7-23.9-23.9S-9.2-319.9 4-319.9s23.9 10.7 23.9 23.9S17.2-272.1 4-272.1zm0-45.2c-11.7 0-21.3 9.6-21.3 21.3s9.6 21.3 21.3 21.3 21.3-9.6 21.3-21.3-9.6-21.3-21.3-21.3z"></path>
      <path fill="#134563" d="m3.5-282.3-1.8-1.9L13.4-296 1.7-307.8l1.8-1.9L17.2-296 3.5-282.3"></path>
      <path fill="#134563" d="M15.3-294.6h-24v-2.8h24z"></path>
    </g>
  </svg>
);

export const LeftArrowIcon = ({ width = "16", height = "16", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="arrow" {...rest}>
    <g fill="#134563">
      <path d="M32 55.9C18.8 55.9 8.1 45.2 8.1 32S18.8 8.1 32 8.1 55.9 18.8 55.9 32 45.2 55.9 32 55.9zm0-45.2c-11.7 0-21.3 9.6-21.3 21.3S20.3 53.3 32 53.3 53.3 43.7 53.3 32 43.7 10.7 32 10.7z"></path>
      <path d="M32.5 45.7 18.8 32l13.7-13.7 1.8 1.9L22.6 32l11.7 11.8-1.8 1.9"></path>
      <path d="M20.7 30.6h24v2.8h-24z"></path>
      </g>
    </svg>
  );

export const StudyInformationIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="bookOpenedIconTitle" stroke="currentColor" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill={fill} color="currentColor" {...rest }>
    <g id="SVGRepo_bgCarrier" stroke-width="0" />
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
    <g id="SVGRepo_iconCarrier"> <title id="bookOpenedIconTitle">Book</title> <path d="M12 6s-2-2-4-2-5 2-5 2v14s3-2 5-2 4 2 4 2c1.333-1.333 2.667-2 4-2 1.333 0 3 .667 5 2V6c-2-1.333-3.667-2-5-2-1.333 0-2.667.667-4 2z" /> <path stroke-linecap="round" d="M12 6v14" /> </g>
  </svg>
);

export const StudyCompoundIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none"  {...rest }><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="currentColor"></path><path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="currentColor"></path><path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="currentColor"></path><path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="currentColor"></path></g></svg>
);

export const UserIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...rest}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 21C4 17.134 7.13401 14 11 14C11.3395 14 11.6734 14.0242 12 14.0709M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);


export const IdIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} fill={fill} viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg" strokeWidth='1.2' stroke="currentColor" {...rest}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width="0.25"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5 10H18.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"></path> <path d="M15.5 13H18.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16" stroke="currentColor" stroke-width="1" stroke-linecap="round"></path> </g></svg>
);

export const SiteIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2" {...rest}><g id="SVGRepo_bgCarrier" stroke-width="1.20"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke-width='1.08' d="M498.069 786.871s303.32-237.507 303.32-409.31-135.8-311.076-303.32-311.076-303.32 139.273-303.32 311.076 303.32 409.31 303.32 409.31z m0-682.312c146.614 0 265.466 121.438 265.466 271.239S498.834 741.519 498.834 741.519 232.603 525.598 232.603 375.798s118.852-271.239 265.466-271.239z m0 416.907c52.349 0 94.788-42.438 94.788-94.788v-37.915c0-52.349-42.438-94.788-94.788-94.788s-94.788 42.438-94.788 94.788v37.915c0 52.349 42.438 94.788 94.788 94.788z m-56.873-132.703c0-31.411 25.462-56.873 56.873-56.873s56.873 25.462 56.873 56.873v37.915c0 31.411-25.462 56.873-56.873 56.873s-56.873-25.462-56.873-56.873v-37.915z m246.448 417.066l-113.745 0.415v-0.415H232.663s-39.1 0-37.915-37.915c1.185-37.915 37.915-37.915 37.915-37.915h56.873s18.366-0.593 18.958-18.958c0.593-18.366-18.958-18.958-18.958-18.958h-56.873s-75.83-1.185-75.83 75.83 75.83 75.83 75.83 75.83h132.703v0.882h322.278s39.1 0 37.915 37.621c-1.185 37.621-37.915 37.621-37.915 37.621h-151.66s-18.958 0.298-18.958 18.664c0 18.364 18.958 18.958 18.958 18.958h151.66s75.83 1.175 75.83-75.242-75.83-76.418-75.83-76.418z" fill="currentColor"></path></g></svg>  
);

export const IndicationIcon = ({ width = "18", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 53.75 53.75" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" stroke-width="1.2"><g id="SVGRepo_bgCarrier" stroke-width="1.2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke-width="1.2" id="padlock" d="M616.45,675.728H580.494a3.543,3.543,0,0,0-3.539,3.539V706.4a3.54,3.54,0,0,0,3.539,3.539H616.45a3.54,3.54,0,0,0,3.539-3.539V679.266A3.541,3.541,0,0,0,616.45,675.728Zm1,30.67a1.01,1.01,0,0,1-1,1H580.494a1.011,1.011,0,0,1-1-1V679.266a1.013,1.013,0,0,1,1-1H616.45a1.012,1.012,0,0,1,1,1Zm-12.167-17.379a6.733,6.733,0,0,0-.527-2.621,6.832,6.832,0,0,0-13.09,2.621,7.479,7.479,0,0,0,1.632,4.17,1.7,1.7,0,0,1,.251.877.918.918,0,0,1-.024.22l-1.121,4.137c-.184.677-.407,1.5-.492,1.832a1.31,1.31,0,0,0-.058.41,1.709,1.709,0,0,0,1.043,1.523,3.2,3.2,0,0,0,1.347.275H602.7a3.167,3.167,0,0,0,1.348-.275,1.711,1.711,0,0,0,1.043-1.523,1.606,1.606,0,0,0-.047-.385c-.1-.354-.317-1.179-.5-1.857l-1.125-4.15a.7.7,0,0,1-.024-.209,1.638,1.638,0,0,1,.251-.87A7.477,7.477,0,0,0,605.279,689.019Zm-3.067,1.725a6.68,6.68,0,0,1-.387.636c-.105.15-.159.209-.155.209a4.059,4.059,0,0,0-.818,2.475,3.3,3.3,0,0,0,.111.878l1.125,4.147c.07.266.152.557.226.831H594.63c.075-.275.152-.565.222-.831l1.125-4.149a3.363,3.363,0,0,0,.111-.874,4.057,4.057,0,0,0-.814-2.472c0-.005-.049-.062-.155-.211a4.8,4.8,0,0,1-.911-2.364,4.216,4.216,0,0,1,.743-2.393,4.224,4.224,0,0,1,6.867-.212,4.223,4.223,0,0,1,.921,2.6A3.942,3.942,0,0,1,602.212,690.744Zm-16.289-17.42c0-1.147,0-1.968,0-2.042a12.552,12.552,0,1,1,25.1,0c0,.059,0,.924,0,2.042h2.543v-2.042h0a15.1,15.1,0,0,0-30.19,0c0,.1,0,.912,0,2.042Z" transform="translate(-576.955 -656.189)" fill="currentColor"></path> </g></svg>);

export const SponsorIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} version="1.1" id="Layer_1" stroke-width='1.2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" {...rest}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M209.049,229.649c28.031,0,40.607,15.711,45.555,24.939c0.622,1.158,2.308,1.157,2.928-0.003 c4.931-9.228,17.438-24.937,45.467-24.937c31.928,0,60.015,21.796,60.015,61.596c0,16.106-3.282,29.902-12.392,45.3 c-18.564,31.379-79.718,72.058-92.279,80.073c-1.388,0.886-3.148,0.889-4.539,0.006c-12.572-7.977-73.738-48.454-92.446-80.079 c-9.109-15.398-12.368-29.195-12.368-45.3C148.988,251.446,177.121,229.649,209.049,229.649z"></path> <g> <path fill="currentColor" d="M256.068,432.023c-3.599,0-7.11-1.02-10.155-2.95c-7.698-4.884-75.774-48.737-97.24-85.022 c-9.974-16.857-14.421-33.144-14.421-52.804c0-22.895,7.838-42.408,22.669-56.431c13.572-12.834,32.085-19.902,52.128-19.902 c22.756,0,37.668,8.65,47.004,17.599c9.318-8.95,24.208-17.599,46.944-17.599c20.043,0,38.548,7.069,52.11,19.906 c14.812,14.02,22.64,33.532,22.64,56.427c0,19.634-4.453,35.919-14.445,52.804c-21.312,36.027-89.348,80.088-97.036,84.994 C263.212,430.993,259.686,432.023,256.068,432.023z M209.049,244.385c-22.56,0-45.324,14.489-45.324,46.86 c0,14.463,2.987,25.415,10.314,37.797c13.549,22.904,56.715,54.847,82.012,71.489c25.291-16.72,68.436-48.753,81.886-71.489 c7.342-12.411,10.338-23.362,10.338-37.797c0-32.371-22.742-46.86-45.278-46.86c-19.265,0-28.29,9.324-32.468,17.145 c-2.86,5.346-8.401,8.662-14.463,8.662c-6.052,0-11.59-3.31-14.449-8.636C237.417,253.721,228.358,244.385,209.049,244.385z"></path> <path fill="currentColor" d="M319.813,122.301c-5.17,0-10.186-2.726-12.883-7.561c-3.964-7.109-1.416-16.085,5.691-20.048 l48.69-27.155c7.107-3.963,16.084-1.416,20.048,5.691c3.964,7.107,1.416,16.085-5.691,20.048l-48.69,27.155 C324.705,121.7,322.243,122.301,319.813,122.301z"></path> <path fill="currentColor" d="M372.442,140.885c-1.332,0-2.686-0.183-4.032-0.564l-53.633-15.227 c-7.83-2.222-12.373-10.372-10.152-18.201c2.225-7.828,10.373-12.373,18.203-10.151l53.633,15.227 c7.83,2.222,12.373,10.372,10.152,18.201C384.769,136.653,378.864,140.885,372.442,140.885z"></path> <path fill="currentColor" d="M256,512c-105.672,0-191.643-85.971-191.643-191.643c0-44.704,16.691-89.804,49.609-134.048 c21.944-29.494,48.145-54.403,70.388-72.917L165.43,55.556c-4.272-13.06-2.097-26.928,5.968-38.052 C179.462,6.379,191.966,0,205.705,0h100.589c13.739,0,26.245,6.379,34.307,17.503c8.065,11.123,10.241,24.992,5.968,38.052 l-19.445,59.429c-2.53,7.737-10.861,11.954-18.587,9.424c-7.735-2.532-11.954-10.854-9.424-18.589l19.445-59.429 c1.3-3.976,0.638-8.198-1.817-11.586c-2.457-3.386-6.263-5.329-10.447-5.329H205.705c-4.184,0-7.99,1.942-10.447,5.329 c-2.455,3.388-3.117,7.611-1.817,11.587l16.123,49.275h2.219c6.326,0,11.947,4.038,13.967,10.034 c2.019,5.995-0.015,12.612-5.053,16.437C173.317,158.126,93.83,231.734,93.83,320.357c0,89.421,72.749,162.169,162.17,162.169 s162.169-72.749,162.169-162.169c0-37.556-13.773-75.748-40.933-113.514c-4.753-6.608-3.248-15.815,3.358-20.568 c6.608-4.754,15.818-3.246,20.568,3.358c30.842,42.882,46.479,86.864,46.479,130.723C447.643,426.029,361.672,512,256,512z"></path> <path fill="currentColor" d="M311.148,125.138h-99.363c-8.138,0-14.737-6.598-14.737-14.737s6.599-14.737,14.737-14.737h99.363 c8.138,0,14.737,6.598,14.737,14.737S319.287,125.138,311.148,125.138z"></path> </g> </g></svg>
);

export const ChangeRequestIcon = ({ width = "18", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5 14.99L15.49 20.01" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3.5 14.99H20.5" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3.5 9.00999L8.51 3.98999" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.5 9.01001H3.5" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);

export const SubjectManagementIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 8H17M7 12H17M9 16H15M4 12V20H20V4H4V7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>  
);

export const DashboardIcon = ({ width = "20", height = "20", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg width={width} height={height} viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path> <path d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path> <path d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path> </g></svg>
);

export const DeleteOutlined = ({ width = "16", height = "16", fill = 'none', ...rest }: SVGAttributes<SVGElement>) => (
  <svg
    width={width} 
    height={height}
    viewBox="0 0 16 16"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M5.28544 2.14118H5.14258C5.22115 2.14118 5.28544 2.0769 5.28544 1.99833V2.14118H10.714V1.99833C10.714 2.0769 10.7783 2.14118 10.8569 2.14118H10.714V3.4269H11.9997V1.99833C11.9997 1.36797 11.4872 0.855469 10.8569 0.855469H5.14258C4.51222 0.855469 3.99972 1.36797 3.99972 1.99833V3.4269H5.28544V2.14118ZM14.2854 3.4269H1.71401C1.39794 3.4269 1.14258 3.68225 1.14258 3.99833V4.56975C1.14258 4.64833 1.20686 4.71261 1.28544 4.71261H2.36401L2.80508 14.0519C2.83365 14.6608 3.33722 15.1412 3.94615 15.1412H12.0533C12.664 15.1412 13.1658 14.6626 13.1944 14.0519L13.6354 4.71261H14.714C14.7926 4.71261 14.8569 4.64833 14.8569 4.56975V3.99833C14.8569 3.68225 14.6015 3.4269 14.2854 3.4269ZM11.9158 13.8555H4.08365L3.65151 4.71261H12.3479L11.9158 13.8555Z"
      fill="#EC1C24"
    />
  </svg>
);