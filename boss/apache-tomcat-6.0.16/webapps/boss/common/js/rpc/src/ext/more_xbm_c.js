// Copyright 2001-2003, Nebiru Software
// www.domapi.com
core.xbmLib1={width:16,height:16,get:function(i,nm){i=core.rVal(i,"BLK");nm=core.rVal(nm,i);return "#define "+nm+"_width "+this.width+"\n#define "+nm+"_height "+this.height+"\nstatic char "+nm+"_bits[] = "+this[i]},blank:"{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};",extAvi:"{0x00,0x1c,0x80,0x13,0x70,0x1e,0xcc,0x01,0x32,0x00,0xf2,0x3f,0xaa,0x6a,0x56,0x75,0x02,0x60,0x12,0x69,0xaa,0x6a,0x12,0x69,0xaa,0x6b,0x02,0x60,0xfe,0x7f,0xfc,0x7f};",extBat:"{0x00,0x00,0xff,0xff,0x01,0xc0,0xfd,0xff,0xfd,0xea,0xfd,0xff,0x01,0xc0,0xc1,0xc1,0x41,0xc3,0xa1,0xc7,0x41,0xc2,0x81,0xc1,0x01,0xc0,0xff,0xff,0xff,0xff,0x00,0x00};",extBmp:"{0xf0,0x03,0xf1,0x23,0xd3,0x72,0xf6,0x6a,0xfd,0x36,0xfe,0x1b,0xfc,0x0d,0xfe,0x1f,0x02,0x1c,0xe4,0x0f,0x04,0x0e,0x04,0x0c,0x04,0x0e,0x04,0x0c,0x04,0x0e,0xf8,0x07};",extChm:"{0x00,0x3e,0x00,0x41,0x80,0x80,0x40,0x8c,0x7e,0x8c,0xc2,0x8f,0x02,0x86,0x82,0x43,0xf2,0x22,0x02,0x3e,0xf2,0x04,0x02,0x3e,0xf2,0x22,0x02,0x22,0x02,0x3e,0xfe,0x07};",extDll:"{0xfe,0x07,0x02,0x08,0x02,0x10,0x02,0x3c,0x02,0x20,0x72,0x20,0xd2,0x20,0xea,0x21,0x52,0x23,0xa2,0x27,0x42,0x22,0x82,0x21,0x02,0x20,0x02,0x20,0x02,0x20,0xfe,0x3f};",extEml:"{0x40,0x00,0x20,0x07,0xb4,0x06,0xff,0xff,0x3d,0x80,0x3d,0xb0,0x7d,0xb0,0x01,0x80,0x01,0x80,0x01,0xbe,0x01,0xa4,0x01,0xa4,0xff,0xf7,0x60,0x2f,0xe0,0x07,0xc0,0x03};",extExe:"{0x00,0x00,0x00,0x00,0xff,0xff,0x01,0xc0,0xfd,0xff,0xfd,0xea,0xfd,0xff,0x01,0xc0,0x01,0xc0,0x01,0xc0,0x01,0xc0,0x01,0xc0,0x01,0xc0,0x01,0xc0,0xff,0xff,0xff,0xff};",extHlp:"{0x80,0x01,0xc0,0x07,0xe0,0x1f,0xf0,0x7f,0x78,0x7c,0xfc,0x79,0x7e,0x7c,0xbf,0xdf,0xff,0xcf,0xff,0x67,0xfb,0x33,0xe3,0x19,0x8e,0x0c,0x38,0x06,0xe0,0x03,0x80,0x01};",extIni:"{0xa8,0x0a,0x54,0x15,0xaa,0x2a,0x02,0x20,0x02,0x20,0x72,0x23,0x02,0x20,0xf2,0x23,0x02,0x21,0xb2,0x26,0x42,0x25,0xb2,0x26,0x82,0x23,0x02,0x20,0x02,0x20,0xfc,0x1f};",extLog:"{0x50,0x15,0xa8,0x2a,0x54,0x55,0x04,0x40,0x04,0x40,0xf4,0x4f,0x04,0x40,0xf4,0x4f,0x04,0x40,0xf4,0x49,0x04,0x4c,0x74,0x4a,0x04,0x4f,0x84,0x48,0x04,0x40,0xf8,0x3f};",extLpt:"{0x00,0x0e,0x00,0x31,0x80,0xc0,0x60,0x20,0x58,0x10,0x86,0x69,0x31,0xee,0xc1,0xf8,0x01,0xfe,0x81,0xff,0x83,0x7f,0x8e,0x7f,0xb2,0x7f,0xcc,0x1f,0xb0,0x07,0xc0,0x01};",extMdb:"{0xf8,0x01,0x2c,0x03,0x36,0x06,0x3b,0x05,0x95,0x04,0x4f,0x06,0x23,0x05,0x13,0x09,0x07,0x12,0xde,0x24,0xfc,0x4b,0x00,0x92,0x00,0xa6,0x00,0xd8,0x00,0x78,0x00,0x00};",extMov:"{0xf0,0x1f,0x10,0x20,0x10,0x40,0x10,0xf0,0x10,0x80,0x11,0x80,0xfb,0xb3,0x47,0xbe,0x3d,0xa6,0x04,0xbe,0x4c,0xb7,0xfc,0x87,0x10,0x80,0x10,0x80,0x10,0x80,0xf0,0xff};",extMpg:"{0xff,0xff,0x05,0xa0,0x05,0xa0,0x07,0xe0,0x07,0xe0,0x05,0xa0,0x05,0xa0,0xff,0xff,0xff,0xff,0x05,0xa0,0x05,0xa0,0x07,0xe0,0x07,0xe0,0x05,0xa0,0x05,0xa0,0xff,0xff};",extNws:"{0x00,0x00,0x00,0x00,0x00,0x00,0xff,0x7f,0x01,0x40,0x01,0xd8,0xf1,0xd9,0x01,0xc0,0xf1,0xc0,0x01,0xc0,0x01,0xc0,0xff,0xff,0xfe,0xff,0x00,0x00,0x00,0x00,0x00,0x00};",extPdp:"{0xe0,0xff,0x20,0x80,0xbe,0xff,0xb1,0xea,0xbf,0xd5,0xbf,0xea,0xbf,0xd5,0xb1,0xea,0xbe,0xd5,0x31,0xc0,0x31,0xd1,0xbf,0xe0,0xa0,0xff,0xa0,0xff,0xc0,0x7f,0x00,0x1f};",extTxt:"{0xe0,0x3f,0xf0,0x7f,0x08,0xa0,0xc8,0xb7,0xe4,0x93,0x04,0x98,0x02,0x88,0x02,0x9c,0x01,0x84,0x01,0x9e,0xff,0x83,0xd0,0x9f,0x10,0x80,0xd0,0x9f,0x10,0xc0,0xe0,0x7f};",extUnk:"{0xfe,0x07,0x02,0x08,0x02,0x10,0x02,0x3c,0x02,0x20,0x02,0x20,0x8a,0x23,0xf2,0x27,0xca,0x27,0xf2,0x25,0xca,0x27,0x72,0x24,0x02,0x20,0x02,0x20,0x02,0x20,0xfe,0x3f};",extVbs:"{0xff,0xff,0xc1,0x87,0x21,0x88,0xd1,0x9d,0x09,0x96,0xe9,0x8f,0x09,0x82,0xd1,0x85,0x21,0x88,0xf1,0x93,0xc9,0x91,0x65,0x88,0xc9,0x84,0xf1,0x83,0x01,0x80,0xff,0xff};",extWav:"{0x80,0x01,0xc0,0x03,0xa0,0x00,0xd0,0x04,0x48,0x84,0x46,0x64,0xc1,0x14,0x41,0x05,0xc1,0xf5,0xc7,0x04,0x4e,0x14,0x58,0x64,0xf0,0x84,0xe0,0x04,0xc0,0x03,0x80,0x01};",extXml:"{0xff,0x0f,0x01,0x10,0x01,0x20,0x01,0x78,0xc1,0x41,0x29,0x4b,0xa5,0x53,0xe9,0x4b,0xc1,0x41,0x01,0x40,0xf9,0x4f,0x01,0x40,0xf9,0x4f,0x01,0x40,0x01,0x40,0xff,0x7f};",extZip:"{0xc0,0x1f,0x2e,0x20,0xf1,0x5f,0xff,0x57,0x01,0x54,0x01,0x54,0x01,0x54,0x01,0x54,0x01,0x54,0x01,0x54,0xff,0x5f,0x20,0x20,0xc0,0x1f,0x00,0x0c,0x80,0x7f,0x80,0x7f};",boxMin:"{0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x1f,0x10,0x10,0x10,0x10,0x10,0x10,0xd0,0x17,0x10,0x10,0x10,0x10,0x10,0x10,0xf0,0x1f,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};",boxMax:"{0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x1f,0x10,0x10,0x10,0x11,0x10,0x11,0xd0,0x17,0x10,0x11,0x10,0x11,0x10,0x10,0xf0,0x1f,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};",arrowDown:"{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xc0,0x03,0xc0,0x03,0xc0,0x03,0xc0,0x03,0xf0,0x0f,0xe0,0x07,0xc0,0x03,0x80,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};",arrowUp:"{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80,0x01,0xc0,0x03,0xe0,0x07,0xf0,0x0f,0xc0,0x03,0xc0,0x03,0xc0,0x03,0xc0,0x03,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};",arrowRight:"{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x03,0xf0,0x07,0xf0,0x0f,0xf0,0x0f,0xf0,0x07,0x00,0x03,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};",arrowLeft:"{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80,0x00,0xc0,0x00,0xe0,0x0f,0xf0,0x0f,0xf0,0x0f,0xe0,0x0f,0xc0,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};",trash1:"{0x00,0x01,0xe0,0x0f,0x10,0x10,0xf8,0x3f,0x10,0x10,0x50,0x15,0x50,0x15,0x50,0x15,0x50,0x15,0x50,0x15,0x50,0x15,0x50,0x15,0x50,0x15,0x10,0x10,0xe0,0x0f,0x00,0x00};",iconInfo:"{0xc0,0x03,0xf0,0x0f,0x78,0x1e,0x3c,0x3c,0x7e,0x7e,0xfe,0x7f,0x3f,0xfc,0x7f,0xfc,0x7f,0xfc,0x7f,0xfc,0x7e,0x7c,0x7e,0x7c,0x3c,0x38,0xf8,0x1f,0xf0,0x0f,0xc0,0x03};",iconQuery:"{0xc0,0x03,0xf0,0x0f,0xf8,0x1f,0x3c,0x3c,0x1e,0x78,0x9e,0x79,0xff,0xfc,0x7f,0xfe,0x7f,0xfe,0x7f,0xfe,0xfe,0x7f,0x7e,0x7e,0x3c,0x3c,0x78,0x1e,0xf0,0x0f,0xc0,0x03};",driveCD:"{0x00,0x07,0xc0,0x18,0x60,0x20,0x90,0x40,0x70,0x42,0x58,0x87,0x88,0x8d,0x08,0x87,0x1e,0x46,0x11,0x48,0x21,0x38,0xfd,0x38,0x0d,0x37,0xff,0x3f,0xfe,0x1f,0x00,0x00};",fldClose1:"{0x00,0x00,0x7c,0x00,0xaa,0x00,0x55,0x3f,0x01,0x60,0xab,0x6a,0x55,0x75,0xab,0x6a,0x55,0x75,0xab,0x6a,0x55,0x75,0xab,0x6a,0xff,0x7f,0xfe,0x7f,0x00,0x00,0x00,0x00};",fldOpen1:"{0x00,0x00,0xf8,0x00,0x04,0x01,0xaa,0x7e,0x52,0xc1,0xaa,0xea,0xff,0xdf,0x01,0xf8,0x55,0xf5,0xaa,0xfa,0x52,0xf5,0xa4,0xea,0xfc,0xff,0xf8,0xff,0x00,0x00,0x00,0x00};",fldFull1:"{0x00,0x01,0x80,0x02,0x78,0x04,0x2c,0x08,0x14,0x71,0x8c,0x62,0xff,0x4f,0x55,0x95,0xab,0x5a,0x56,0x75,0xaa,0x6a,0x56,0x75,0xac,0x6a,0xfc,0x7f,0xf8,0x3f,0x00,0x00};",fldShare1:"{0x00,0x00,0xfc,0x00,0x56,0x01,0xab,0x3f,0x55,0x55,0xab,0x6a,0x55,0x55,0xab,0x6a,0x55,0x55,0xaf,0x6a,0xff,0x57,0x0f,0x68,0x0f,0x7f,0x1f,0x60,0x2f,0x18,0xc0,0x07};",fldClose2:"{0x00,0x00,0x7c,0x00,0x82,0x00,0x01,0x3f,0x01,0x60,0x01,0x60,0x01,0x60,0x01,0x60,0x01,0x60,0x01,0x60,0x01,0x60,0x01,0x60,0xff,0x7f,0xfe,0x7f,0x00,0x00,0x00,0x00};",fldOpen2:"{0x00,0x00,0xf8,0x00,0x04,0x01,0x02,0x7e,0x02,0xc0,0x02,0xc0,0xff,0xdf,0x01,0xf8,0x01,0xf0,0x02,0xf0,0x02,0xe0,0x04,0xc0,0xfc,0xff,0xf8,0xff,0x00,0x00,0x00,0x00};",fldFull2:"{0x00,0x01,0x80,0x02,0x78,0x04,0x24,0x08,0x14,0x71,0x8c,0x62,0xff,0x4f,0x01,0x90,0x01,0x50,0x02,0x60,0x02,0x60,0x02,0x60,0x04,0x60,0xfc,0x7f,0xf8,0x3f,0x00,0x00};",fldShare2:"{0x00,0x00,0xfc,0x00,0x82,0x01,0x01,0x3f,0x01,0x40,0x01,0x40,0x01,0x40,0x01,0x40,0x01,0x40,0x0f,0x40,0xff,0x47,0x0f,0x48,0x0f,0x7f,0x1f,0x60,0x2f,0x18,0xc0,0x07};",recycle:"{0xf0,0x00,0x3c,0x03,0x7f,0x0c,0xf9,0x30,0xe1,0xc1,0x01,0xe3,0x61,0xf0,0x92,0xf9,0xba,0xf9,0x12,0x78,0x54,0x7d,0xe4,0x3d,0x44,0x3c,0x18,0x1c,0x60,0x1e,0x80,0x0f};",myComputer:"{0x00,0x00,0x00,0x80,0x00,0xe0,0xe0,0xef,0xe0,0xef,0x60,0xe8,0xe0,0xee,0xe0,0xef,0x00,0xe0,0x00,0xe0,0xf0,0xbf,0x00,0xc0,0xa8,0xfa,0x54,0x75,0x00,0x30,0xfe,0x1f};",desktop:"{0x00,0x30,0x00,0x28,0x1f,0xb4,0x0d,0xfa,0x07,0xdd,0xc3,0xe6,0x61,0xc3,0xd0,0xc1,0x48,0xc2,0x04,0xc1,0x88,0xc0,0x51,0xc0,0x23,0xe0,0x05,0xd0,0xff,0xff,0xff,0xff};",network:"{0xff,0x01,0x01,0x01,0x7d,0x01,0x75,0x01,0xfd,0x7f,0x7d,0x40,0x41,0x5f,0x7f,0x59,0x7f,0x5d,0x41,0x5f,0x4d,0x40,0xfe,0x7f,0xcc,0xff,0x73,0xc0,0x73,0xc3,0x8c,0x7f};"};
