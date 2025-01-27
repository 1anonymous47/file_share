#define _CRT_SECURE_NO_WARNINGS
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include<stdio.h>
#include<windows.h>
#include<io.h>
#include "stb_image_write.h"
void runner(const char *name,char * i)
{ 
	char buffer1[100];
	sprintf(buffer1, "C:\\Users\\akfla\\Pictures\\%s%i.png", name, i);
	
	HDC hscreen = GetDC(NULL);
	HDC hdc = CreateCompatibleDC(hscreen);

	int width = GetSystemMetrics(SM_CXSCREEN);
	int height = GetSystemMetrics(SM_CYSCREEN);

	HBITMAP  hbitmap = CreateCompatibleBitmap(hscreen, width, height);

	SelectObject(hdc, hbitmap);

	BitBlt(hdc, 0, 0, width, height, hscreen, 0, 0, SRCCOPY);

	BITMAPINFOHEADER bi;
	bi.biSize = sizeof(BITMAPINFOHEADER);
	bi.biHeight = -height;
	bi.biWidth = width;
	bi.biPlanes = 1;
	bi.biBitCount = 24;
	bi.biCompression = BI_RGB;

	int size = width * height * 3;
	BYTE* pixels = (BYTE*)malloc(size);


	GetDIBits(hdc, hbitmap, 0, height, pixels, (BITMAPINFO*)&bi, DIB_RGB_COLORS);
	// Loop through each pixel and swap the red and blue channels
	for (int i = 0; i < size; i += 3) {
		BYTE blue = pixels[i];     // Blue channel
		BYTE green = pixels[i + 1]; // Green channel
		BYTE red = pixels[i + 2];   // Red channel

		// Swap red and blue channels (to convert BGR to RGB)
		pixels[i] = red;           // Red channel goes to Blue position
		pixels[i + 1] = green;     // Green remains the same
		pixels[i + 2] = blue;      // Blue channel goes to Red position
	}



	if (stbi_write_png(buffer1, width, height, 3, pixels, width * 3)) {
		printf("Screenshot saved to %s\n", buffer1);
	}
	else {
		printf("Failed to save the screenshot.\n");
	}
	free(pixels);

	
}
int main() {
	int msgBoxResult = MessageBox(NULL,
		L"After Pressing Yes wait for 5 sec to take a picture between that time Frame the screen correctly in the place where you want to take the picture",
		L"Screenshot",
		MB_YESNO | MB_ICONQUESTION);
	while (1) 
	{
		
		char time[100];
		SYSTEMTIME systemTime;
		GetSystemTime(&systemTime);
		snprintf(time, sizeof(time),
			"%04d-%02d-%02d %02d:%02d:%02d.%03d",
			systemTime.wYear,
			systemTime.wMonth,
			systemTime.wDay,
			systemTime.wHour,
			systemTime.wMinute,
			systemTime.wSecond,
			systemTime.wMilliseconds
		);



		int msgBoxResult = MessageBox(NULL,
			L"Do you want to take  picture",
			L"Screenshot",
			MB_YESNO | MB_ICONQUESTION);
		if (msgBoxResult == IDYES) {
			Sleep(4000);
			runner("screenshot", time);

		}
		else if (msgBoxResult == IDNO) {
			return 0;
		}
	}
	
}
