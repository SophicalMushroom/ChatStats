export const hex2rgb = (hexString) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
};

// const colors = [
// 	"#4e79a7",
// 	"#a0cbe8",
// 	"#f28e2b",
// 	"#59a14f",
// 	"#8cd17d",
// 	"#b6992d",
// 	"#f1ce63",
// 	"#499894",
// 	"#86bcb6",
// 	"#e15759",
// 	"#ff9d9a",
// 	"#79706e",
// 	"#bab0ac",
// 	"#d37295",
// 	"#fabfd2",
// 	"#b07aa1",
// 	"#b07aa1",
// 	"#d4a6c8",
// 	"#9d7660",
// 	"#d7b5a6",
// ];

// colors.map((i) => {
// 	console.log(hexToRgb(i));
// });
