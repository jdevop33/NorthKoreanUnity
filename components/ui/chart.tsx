import * as React from "react"
// Import specific types from recharts
import * as RechartsPrimitive from "recharts"
import { Payload } from "recharts/types/component/DefaultLegendContent"; // Type for legend payload items
import { TooltipProps } from "recharts/types/component/Tooltip"; // Type for tooltip props

import { cn } from "@/lib/utils"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const THEMES = { light: "", dark: ".dark" } as const 

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        {/* <ChartStyle id={chartId} config={config} /> */}
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

/* Temporarily commented out due to persistent parsing error */
/*
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            const cssRules = colorConfig
              .map(([key, itemConfig]) => {
                const color =
                  itemConfig.theme?.[theme as keyof typeof THEMES] ||
                  itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
              })
              .filter(Boolean)
              .join("
")
              
            return `${prefix} [data-chart=${id}] {
${cssRules}
}`;
          })
          .join("
")
      }}
    />
  )
}
*/

const ChartTooltip = RechartsPrimitive.Tooltip

// Use types from recharts for Tooltip content props
// Define ValueType and NameType generics for TooltipProps
type ValueType = number | string | (number | string)[]; 
type NameType = number | string;

// Extract the payload type from TooltipProps more reliably
type TooltipItemPayload = NonNullable<TooltipProps<ValueType, NameType>['payload']>[number];

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps<ValueType, NameType> & // Use TooltipProps with appropriate value/name types
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload, // This will be typed by TooltipProps as TooltipItemPayload[] | undefined
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      // payload item is now typed as TooltipItemPayload
      const item = payload[0];
      // Use type assertion or check for properties if needed, as item structure can vary
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {/* labelFormatter might receive typed payload now */}
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {/* item is now properly typed from payload */} 
          {payload.map((item: TooltipItemPayload, index: number) => { 
            // item type is TooltipItemPayload from recharts
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            // Access item.payload for underlying data. Assert type if necessary but be careful.
            const itemPayload = item.payload as Record<string, unknown> | undefined;
            // Ensure indicatorColor is a string or undefined, default to item.color if payload.fill is not a string
            let indicatorColor: string | undefined = color;
            if (!indicatorColor) {
              if (typeof itemPayload?.fill === 'string') {
                indicatorColor = itemPayload.fill;
              } else if (typeof item.color === 'string') { // item.color is sometimes used by recharts
                indicatorColor = item.color;
              } 
            }

            return (
              <div
                // Use item.name or item.dataKey which should be unique 
                key={item.dataKey || item.name || index} 
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {/* formatter might receive typed item/payload now */} 
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={{
                            backgroundColor: indicator !== "dashed" ? indicatorColor : undefined,
                            borderColor: indicatorColor // Already string | undefined
                          }}
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && item.value !== null && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {/* Ensure value is displayable */}
                          {typeof item.value === 'number' || typeof item.value === 'string' ? item.value.toLocaleString() : ''}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

// Use Payload type from recharts 
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    // payload type is now Payload[] | undefined from LegendProps
    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {/* Use Payload type for item */} 
        {payload.map((item: Payload) => {
          // item.value should contain the dataKey here according to Recharts Payload type
          const key = `${nameKey || item.value || "value"}` 
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              // Use item.value (dataKey) for the key 
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    // Use item.color which should be provided by Recharts Payload type
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label || item.value} {/* Display item.value (dataKey) if no label */} 
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
// Use a union type for the payload parameter.
type PossiblePayloadItem = Payload | TooltipItemPayload;

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: PossiblePayloadItem, // Use the union type here
  key: string
) {
  // Keep the implementation logic as it needs to check for various properties
  // that might exist on either type in the union.
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  // For tooltip payload, the actual data might be in payload.payload
  // Check if 'payload' property exists and is an object
  const payloadPayload = ('payload' in payload && typeof payload.payload === 'object' && payload.payload !== null) 
                         ? payload.payload as Record<string, unknown> // Type assertion
                         : undefined;

  let configLabelKey: string = key;

  // Check payload itself (common for legend: item.value is the key)
  if ('value' in payload && payload.value === key) {
      configLabelKey = key;
  }
  // Check tooltip item's direct properties (name or dataKey)
  else if ('name' in payload && payload.name === key) {
     configLabelKey = key;
  }
  else if ('dataKey' in payload && payload.dataKey === key) {
     configLabelKey = key;
  } 
  // Check inside payload.payload (common in tooltips for underlying data)
  else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key as keyof typeof payloadPayload] === "string") {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }
  // Fallback check for string value on payload (less common)
  else if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
      configLabelKey = payload[key as keyof typeof payload] as string;
  }

  // Return config based on derived key or original key
  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  // ChartStyle, // Temporarily removed
}
