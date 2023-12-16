import os
import datetime
from PIL import Image

def getFiles():

    files = os.listdir()
    files = [f for f in files if not os.path.isdir(f)]
    return files
        
def getDirs():

    files = os.listdir()
    dirs = []
    for file in files:
        if os.path.isdir(file):
            dirs.append(file)
    return dirs

def getDTstr(value):

    if value < 10:
        string = '0' + str(value)
    elif value >= 10:
        string = str(value)
    return string



print('Start ordeding...')

files = getFiles()
filesCount = 0
dirsCount = 0



for file in files:
    n = file[-4:]
    if n=='.jpg' or n=='jpeg' or n=='.JPG' or n=='JPEG':
        exif = Image.open(file)._getexif()
        if exif is None: continue
        if exif.get(306, None) is None: continue
        dt = datetime.datetime.strptime(exif[306], '%Y:%m:%d %H:%M:%S')

        filesCount += 1


        year = getDTstr(dt.year - 2000)
        month = getDTstr(dt.month) 
        day = getDTstr(dt.day)
        hour = getDTstr(dt.hour)
        minute = getDTstr(dt.minute)
        second = getDTstr(dt.second)
        
        if dt.hour >= 5:    
            if dt.day < 10:
                day = '0' + str(dt.day)
            elif dt.day >= 10:
                day = str(dt.day)

        elif dt.hour < 5: 
            hour = 'n_' + hour
            if (dt.day - 1) < 10:
                day = '0' + str(dt.day - 1)
            elif (dt.day - 1) >= 10:
                day = str(dt.day - 1)

        folderName = ('%s.%s.%s' % (day, month, year))

        if not os.path.isdir(folderName):
            dirsCount += 1
            os.mkdir(folderName)
            
        os.replace(file, '%s/%s' % (folderName, str(dt.year) +'-'+ month +'-'+ day +'_'+ hour +'-'+ minute +'-'+ second +'_' + file[-5:])) # перемещение

print("Files are ordeded!")
print(dirsCount, "dirs created")
print(filesCount, "files moved")


dirs = getDirs()
print('Start resize...')
lowCounter = 0
filesCounter = 0

total = 0
for d in dirs:
    os.chdir(d)
    total += len(getFiles())
    os.chdir('..')


for d in dirs:
    os.chdir(d)
    files = getFiles()
    for file in files:
        n = file[-4:]
        if n=='.jpg' or n=='jpeg' or n=='.JPG' or n=='JPEG':
            filesCounter += 1
            size = os.path.getsize(file)
            im = Image.open(file)
            legibility = size * 100 // (im.size[0] * im.size[1])
            if legibility > 30:
                newSize = (im.size[0] * 3 // 4, im.size[1] * 3 // 4)
            else:
                newSize = (im.size[0] * 2 // 3, im.size[1] * 2 // 3)
                lowCounter += 1

            im.resize(newSize, Image.BICUBIC).save(file, quality=85, icc_profile = im.info.get('icc_profile', ''))

            im.close()
            if filesCounter % 1 == 0:
                print('\rprogress: ' + str(filesCounter * 100 // total) + '%', end='')
    os.chdir('..')
    
print('Total images:', filesCounter)
print('Low detailed:', lowCounter)

from random import random
from PIL import Image, ImageDraw2
import numpy as np

def createWallPaper(colors, image_size=(1920, 1080), cell_size=30, crop=True, rnd=True):

assert min(image_size) // cell_size > 2, 'Small cell size'

    width = image_size[0] 
        if width % cell_size == 0:
            break
        else:
            cell_size += 1
    print(f'Actual cell size: {cell_size}px')
    
    height = image_size[1]
    if height % cell_size != 0:
        height = cell_size * (height // cell_size) + cell_size

    matrix = np.zeros((height, width, 3), dtype=np.uint8)

    y = 0
    r = np.random.randint

    while y < height:
        x = 0
        while x < width:
            color  = colors[np.random.randint(len(colors))]
            c = np.array(colors[r(len(colors))])
            if rnd:
                c += np.random.randint(-5, 5)

            matrix[y: y+cell_size, x: x+cell_size] = c     
            matrix[y, x: x+cell_size] = c + 25   
            matrix[y: y+cell_size, x] = c + 25            
            matrix[y: y+cell_size, x+cell_size-1] = c - 25  
            matrix[y+cell_size-1, x: x+cell_size] = c - 25 

            x += cell_size
        y += cell_size

    if crop:
        matrix = matrix[:image_size[1], :]    

    img = Image.fromarray(matrix)
    return img

    n = len(colors)

    matrix = np.zeros((cell_size, cell_size*n, 3), dtype=np.uint8)
    position = 0

    for color in colors:
        matrix[:, position: position + cell_size] = color
        position += cell_size
    im = Image.fromarray(matrix)
    display(im)
    
colors = createColors()
displayColors(colors)

 meanBrightness = color.mean() 
    lineWidth = 4
    for y in range(Ay, By):
        x = getX(y, A, B)
        color = np.array((255, 0, 0))
        for i in range(lineWidth):
            matrix[y, x] = color + meanBrightness//2
            x += 1

    for y in range(Ey, Dy):
        x = getX(y, E, D) - 1
        for i in range(lineWidth):
            matrix[y, x] = color - meanBrightness//3
            x -= 1

    for x in range(Ax, Fx):
        y = Ay
        for i in range(lineWidth):
            matrix[y, x] = color + meanBrightness//3
            y += 1

    for x in range(Cx, Dx):
        y = Cy
        for i in range(lineWidth):
            matrix[y, x] = color - meanBrightness//4
            y -= 1

    for y in range(By, Cy):
        x = getX(y, B, C)
        for i in range(lineWidth):
            matrix[y, x] = color + meanBrightness//4
            x += 1

    for y in range(Fy, Ey):
        x = getX(y, F, E)
        for i in range(lineWidth):
            matrix[y, x] = color - meanBrightness//5
            x -= 1

width = (size[0] + 150) * scale
    height = (size[1] + 150) * scale
    lineWidth = line_width * scale
    side_size = side_size * scale

    matrix = np.zeros((height, width, 3), dtype=np.uint8)
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            matrix[i, j] = (40, 40, 40)

    hex_height = int(2 * side_size * sin(pi/3))
    hex_width = int(2 * side_size * cos(pi/3) + side_size)

    orgnX = round(side_size * cos(pi/3))
    orgnY = 0

    Y, X = orgnY, orgnX
    while Y + hex_height < height:
        X = orgnX
        while X + hex_width < width:
            color  = colors[np.random.randint(len(colors))]
            paintHex(matrix, side_size, color, (Y, X))
            X += side_size + hex_width + lineWidth
        Y += hex_height + lineWidth

    if line_width:
        Y = orgnY + hex_height//2 + lineWidth - 1
    else:
        Y = orgnY + hex_height//2

    while Y + hex_height < height:
        X = orgnX + side_size + round(side_size*cos(pi/3))
        if line_width:
            X += 2
        while X + hex_width < width:
            color  = colors[np.random.randint(len(colors))]
            paintHex(matrix, side_size, color, (Y, X))
            X += side_size + hex_width + lineWidth
        Y += hex_height + lineWidth
    
    shiftX = hex_width // 2
    matrix = matrix[hex_height//2: hex_height//2 + scale * size[1], shiftX: shiftX + scale * size[0]]

    image = Image.fromarray(matrix)
    image = image.resize(size, Image.Resampling.LANCZOS)


import sys, os


from PyQt6.QtGui import QPixmap, QImage

class ImageViewer(QGraphicsView):

    viewChanged = pyqtSignal()

    def __init__(self, parent=None) -> None:
        super().__init__(parent)

        self.aspectRationMode = Qt.AspectRatioMode.KeepAspectRatio
        self.wheelZoomFactor = 1.25
        self.zoomStack = []

        self._isZooming = False

        self._pixelPosition = QPoint()
        self._scenePosition = QPointF()
        
        self.setAcceptDrops(True)

    def dragMoveEvent(self, event) -> None:
        mime_data = event.mimeData()
        if mime_data.hasUrls() and len(mime_data.urls()) == 1:
            event.accept()
        else:
            event.ignore()

    def dropEvent(self, event) -> None:
        mime_data = event.mimeData()
        path = mime_data.urls()[0].path()[1:]
        _, extension = os.path.splitext(path)
        if extension.lower() == ".raw":
            self.parent().open_file(path)


    def hasImage(self):

        return self._image is not None
    
    def clearImage(self):

        if self.hasImage():
            self.scene.removeItem(self._image)
            self._image = None

    def pixmap(self):

        if self.hasImage():
            return self._image.pixmap()
        return None

    def image(self):

        if self.hasImage():
            return self._image.pixmap().toImage()
        return None
    
    def setImage(self, image):
        if type(image) is QPixmap:
            pixmap = image
        elif type(image) is QImage:
            pixmap = QPixmap.fromImage(image)
        else:

            self._image.setPixmap(pixmap)

            self._image = self.scene.addPixmap(pixmap)

        self.setSceneRect(QRectF(pixmap.rect()))
        self.updateViewer()

    def updateViewer(self):
        if not self.hasImage():
            return
        if len(self.zoomStack):
            self.fitInView(self.zoomStack[-1], self.aspectRationMode)
        else:
            self.fitInView(self.sceneRect(), self.aspectRationMode)

    def clearZoom(self):
        if len(self.zoomStack):
            self.zoomStack = []
            self.updateViewer()
            self.viewChanged.emit()

    def resizeEvent(self, event):
        self.updateViewer()

    def wheelEvent(self, event) -> None:
        if self.wheelZoomFactor is None: return
        if self.wheelZoomFactor == 1:return

        if event.angleDelta().y() > 0:

            if len(self.zoomStack) == 0:
                    self.zoomStack.append(self.sceneRect())
            elif len(self.zoomStack) > 1:
                del self.zoomStack[:-1]
            zoomRect = self.zoomStack[-1]
            center = zoomRect.center()
            zoomRect.setWidth(zoomRect.width() / self.wheelZoomFactor)
            zoomRect.setHeight(zoomRect.height() / self.wheelZoomFactor)
            zoomRect.moveCenter(center)
            self.zoomStack[-1] = zoomRect.intersected(self.sceneRect())
            self.updateViewer()
            self.viewChanged.emit()
        else:

            if len(self.zoomStack) == 0:

                return
            if len(self.zoomStack) > 1:
                del self.zoomStack[:-1]
            zoomRect = self.zoomStack[-1]
            center = zoomRect.center()
            zoomRect.setWidth(zoomRect.width() * self.wheelZoomFactor)
            zoomRect.setHeight(zoomRect.height() * self.wheelZoomFactor)
            zoomRect.moveCenter(center)
            self.zoomStack[-1] = zoomRect.intersected(self.sceneRect())
            if self.zoomStack[-1] == self.sceneRect():
                self.zoomStack = []
            self.updateViewer()
            self.viewChanged.emit()
        event.accept()
        return


    
    def open(self, filepath=None):

        if filepath is None:
            filepath, dummy = QFileDialog.getOpenFileName(self, "Open image file.")
        if len(filepath) and os.path.isfile(filepath):
            image = QImage(filepath)
            self.setImage(image)

if __name__ == '__main__':
    import sys
    try:
        from PyQt6.QtWidgets import QApplication
    except ImportError:
        from PyQt5.QtWidgets import QApplication

    def handleLeftClick(x, y):
        row = int(y)
        column = int(x)
        print("Clicked on image pixel (row="+str(row)+", column="+str(column)+")")

    def handleViewChange():
        print("viewChanged")


    app = QApplication(sys.argv)

    viewer = ImageViewer()

    viewer.open()

    viewer.show()
    sys.exit(app.exec())
